import { DetectedObject } from "@/hooks/useModelWorker";
import * as faceDetection from "@tensorflow-models/face-detection";
import { MediaPipeFaceDetectorModelConfig } from "@tensorflow-models/face-detection/dist/mediapipe/types";
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

async function detectFace(file: File) {
  const imageData = await createImageData(file);

  if (!imageData) return;

  // load model
  const model = faceDetection.SupportedModels.MediaPipeFaceDetector;
  const detectorConfig: MediaPipeFaceDetectorModelConfig = {
    runtime: "tfjs", // or 'mediapipe'
  };
  const detector = await faceDetection.createDetector(model, detectorConfig);

  // detect object
  const predictions = await detector.estimateFaces(imageData);

  return predictions;
}

async function getFaceInfo(file: File): Promise<DetectedObject[] | undefined> {
  const faces = await detectFace(file);
  console.log("faces: ", faces);

  if (!faces) return;

  const facesInfo: DetectedObject[] = faces.map((face) => {
    const xPourcent = face.box.xMin / COMPRESS_WIDTH;
    const yPourcent = face.box.yMin / COMPRESS_HEIGHT;
    const widthPourcent = face.box.width / COMPRESS_WIDTH;
    const heightPourcent = face.box.height / COMPRESS_HEIGHT;

    return {
      box: {
        x: xPourcent,
        y: yPourcent,
        width: widthPourcent,
        height: heightPourcent,
      },
    };
  });

  return facesInfo;
}

onmessage = async (e) => {
  const { file } = e.data;
  try {
    performance.mark("start");
    const predictions = await getFaceInfo(file);
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      message: (error as any).message!,
    });
  }
};
