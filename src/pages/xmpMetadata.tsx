import FirstStep from "@/components/FirstStep";
import FourStep from "@/components/FourStep";
import SecondStep from "@/components/SecondStep";
import { AreaDimension, createCanvasRect } from "@/lib/createCanvas";
import { getImageMetadata } from "@/lib/getImageMetadata";
import { getOrientation, Orientation } from "@/lib/getOrientation";
import {
  getPointerHorizontalDimension,
  getPointerVerticalDimension,
} from "@/lib/getPointerDimension";
import { useEffect, useRef, useState } from "react";

export default function XmpMetadata() {
  const [image, setImage] = useState<File>();
  const [imageMetadata, setImageMetadata] = useState();
  const [orientation, setOrientation] = useState<Orientation>();
  const [translateY, setTranslateY] = useState(0);
  const [displayCrop, setDisplayCrop] = useState(false);
  const [animate, setAnimate] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewRef = useRef();

  function displayCropZone() {
    setDisplayCrop((prev) => !prev);
  }

  function animateCropZone() {
    setAnimate((prev) => !prev);
  }

  function clearCanvas() {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!ctx) return;

    ctx.reset();
  }

  function reset() {
    setImage(undefined);
    setImageMetadata(undefined);
    setOrientation(undefined);
    setDisplayCrop(false);
    setAnimate(false);
    setTranslateY(0);
    clearCanvas();
  }

  async function onAddImage(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    reset();
    if (files && files.length > 0) {
      setImage(files[0]);
      const currentImageMetatdata = await getImageMetadata(files[0]);
      const currentOrientation = getOrientation(
        currentImageMetatdata.Orientation,
      );

      setImageMetadata(currentImageMetatdata);
      setOrientation(currentOrientation);
    }
  }

  function getMidPointDimension(regionAreas: Any[]) {
    const midPointX: number = regionAreas.reduce((acc, region) => {
      return acc + region.Area.x / regionAreas.length;
    }, 0);
    const midPointY: number = regionAreas.reduce((acc, region) => {
      return acc + region.Area.y / regionAreas.length;
    }, 0);
    return {
      x: midPointX,
      y: midPointY,
      w: 20,
      h: 20,
    };
  }

  function getFacePosition() {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!ctx || !image) return;

    const regions = imageMetadata?.Regions;

    const regionAreas = Array.isArray(regions?.RegionList)
      ? regions?.RegionList
      : [regions?.RegionList];

    if (regionAreas) {
      regionAreas?.map((region) => {
        console.log("Orientation =", orientation);
        let pointerDimension: AreaDimension;

        if (orientation === Orientation.VERTICAL) {
          pointerDimension = getPointerVerticalDimension(
            region?.Area,
            canvas.width,
            canvas.height,
          );
        } else {
          pointerDimension = getPointerHorizontalDimension(
            region?.Area,
            canvas.width,
            canvas.height,
          );
        }

        createCanvasRect(ctx, "red", pointerDimension);
      });
    }
  }

  function getTranslateY(midPointY: number) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const cropSize = 350;

    const translateY = midPointY * canvas.height - cropSize / 2;
    setTranslateY(translateY);
  }

  function getMidPoint() {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) return;

    const regions = imageMetadata?.Regions;

    const regionAreas = Array.isArray(regions?.RegionList)
      ? regions?.RegionList
      : [regions?.RegionList];

    let midPointDimension: AreaDimension;
    const midPoint = getMidPointDimension(regionAreas);
    getTranslateY(midPoint.x);

    if (orientation === Orientation.VERTICAL) {
      midPointDimension = getPointerVerticalDimension(
        midPoint,
        canvas.width,
        canvas.height,
      );
    } else {
      midPointDimension = getPointerHorizontalDimension(
        midPoint,
        canvas.width,
        canvas.height,
      );
    }
    createCanvasRect(ctx, "blue", midPointDimension);
  }

  // use to init the canvas size when a new image uploaded
  useEffect(() => {
    const canvas = canvasRef.current;
    const imageRef = previewRef.current;

    if (!canvas || !image || !imageRef) return;

    const img = new Image();
    img.src = URL.createObjectURL(image);

    img.onload = () => {
      canvas.width = imageRef!.clientWidth;
      canvas.height = imageRef!.clientHeight;
    };
  }, [canvasRef, image]);
  return (
    <div className="flex w-full h-full items-center">
      <FirstStep image={image} onAddImage={onAddImage} />

      <div className="bg-neutral-100 h-[70%] w-[1px]"></div>

      <SecondStep imageMetadata={imageMetadata} />

      <div className="bg-neutral-100 h-[70%] w-[1px]"></div>
      <FourStep
        image={image}
        canvasRef={canvasRef}
        previewRef={previewRef}
        transformY={translateY}
        displayCrop={displayCrop}
        animate={animate}
        getFacePosition={getFacePosition}
        getMidPoint={getMidPoint}
        displayCropZone={displayCropZone}
        animateCropZone={animateCropZone}
      />
    </div>
  );
}
