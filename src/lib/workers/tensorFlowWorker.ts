import { DetectedObject } from "@/hooks/useModelWorker";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import("@tensorflow/tfjs-backend-cpu");
import("@tensorflow/tfjs-backend-webgl");

const COMPRESS_WIDTH = 512;
const COMPRESS_HEIGHT = 512;

async function createImageData(file: File) {
  const img = await createImageBitmap(file, {
    resizeWidth: COMPRESS_WIDTH,
    resizeHeight: COMPRESS_HEIGHT,
  });

  const canvas = new OffscreenCanvas(img.width, img.height);
  const ctx = canvas.getContext("2d");

  ctx?.drawImage(img, 0, 0);
  const imageData = ctx?.getImageData(0, 0, img.width, img.height);
  return imageData;
}

async function detectObject(file: File) {
  const imageData = await createImageData(file);

  if (!imageData) return;

  // load model
  const model = await cocoSsd.load();

  // detect object
  const predictions = await model.detect(imageData);

  return predictions;
}

async function getObjectInfo(
  file: File,
): Promise<DetectedObject[] | undefined> {
  const detectedObjects = await detectObject(file);

  if (!detectedObjects) return;

  const objectsInfo: DetectedObject[] = detectedObjects.map((object) => {
    const { bbox, score, class: classDetection } = object;
    const [x, y, width, height] = bbox;

    const xPourcent = x / COMPRESS_WIDTH;
    const yPourcent = y / COMPRESS_HEIGHT;
    const widthPourcent = width / COMPRESS_WIDTH;
    const heightPourcent = height / COMPRESS_HEIGHT;

    return {
      box: {
        x: xPourcent,
        y: yPourcent,
        width: widthPourcent,
        height: heightPourcent,
      },
      scoreDetection: Number((score * 100).toFixed(2)),
      classDetection,
    };
  });

  return objectsInfo;
}

onmessage = async (e) => {
  const { file } = e.data;
  try {
    performance.mark("start");
    const predictions = await getObjectInfo(file);
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
  } catch (error) {
    postMessage({
      type: "error",
      message: error.message!,
    });
  }
};
