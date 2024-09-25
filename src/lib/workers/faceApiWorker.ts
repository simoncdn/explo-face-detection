import { DetectedObject } from "@/hooks/useModelWorker";
import * as tf from "@tensorflow/tfjs";
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
  await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");

  // detect object
  const predictions = await faceapi.detectAllFaces(imageData);

  return predictions;
}

async function getObjectInfo(
  file: File,
): Promise<DetectedObject[] | undefined> {
  const detectedFaces = await detectObject(file);

  console.log("detectedFaces: ", detectedFaces);
  if (!detectedFaces) return;

  const objectsInfo: DetectedObject[] = detectedFaces.map((face) => {
    const { probability, topLeft, bottomRight } = face;
    const faceProbality = Number(probability?.toString()) || 0;
    const [x, y] = topLeft;
    const [bottom, right] = bottomRight;

    const width = right - y;
    const height = bottom - x;

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
      scoreDetection: Number((faceProbality * 100).toFixed(2)),
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
