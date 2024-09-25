import * as exifr from "exifr";
import { AreaDimension } from "../createCanvas";
import { DetectedObject } from "@/hooks/useModelWorker";
import {
  getPointerHorizontalDimension,
  getPointerVerticalDimension,
} from "../getPointerDimension";

export type Area = {
  x: number;
  y: number;
  w: number;
  h: number;
};

export type RegionList = {
  Area: Area;
};

export type Region = {
  RegionList: RegionList | RegionList[];
};

export type ImageMetadata = {
  Regions: Region;
  Orientation: Orientation;
};

enum Orientation {
  HORIZONTAL = "Horizontal",
  VERTICAL = "Vertical",
}

export function getOrientation(orientationMetadata?: string) {
  if (orientationMetadata?.includes("90")) {
    return Orientation.VERTICAL;
  } else {
    return Orientation.HORIZONTAL;
  }
}

async function getImageMetadata(file: File) {
  const imageMetadata: ImageMetadata = await exifr
    .parse(file, true)
    .then((metadata) => {
      return {
        ...metadata,
        Orientation: getOrientation(metadata?.Orientation),
      };
    });

  return imageMetadata;
}

async function getFacePosition(
  imageMetadata: ImageMetadata,
): Promise<DetectedObject[] | undefined> {
  const regions = imageMetadata?.Regions;
  console.log("regions", regions);

  const regionAreas = Array.isArray(regions.RegionList)
    ? regions.RegionList
    : [regions.RegionList];

  console.log("Areas", regionAreas);
  if (!regionAreas) return;

  const pointersDimension: DetectedObject[] = regionAreas.map((region) => {
    if (imageMetadata.Orientation === Orientation.VERTICAL) {
      return {
        box: {
          x: 1 - region.Area.y - region.Area.w / 2,
          y: region.Area.x - region.Area.h / 2,
          width: region.Area.w,
          height: region.Area.h,
        },
      };
    } else {
      return {
        box: {
          x: 1 - region.Area.x - region.Area.w / 2,
          y: 1 - region.Area.y - region.Area.h / 2,
          width: region.Area.w,
          height: region.Area.h,
        },
      };
    }
  });

  return pointersDimension;
}

onmessage = async (e) => {
  const { file } = e.data;

  try {
    performance.mark("start");
    const imageMetadata = await getImageMetadata(file);
    const predictions = await getFacePosition(imageMetadata);
    performance.mark("end");
    const performanceDetection = performance.measure(
      "detection",
      "start",
      "end",
    );
    postMessage({
      type: "predictions",
      predictions,
      performanceDetection: performanceDetection.duration,
    });
  } catch {
    postMessage({
      type: "error",
      message: "Sorry",
    });
  }
};
