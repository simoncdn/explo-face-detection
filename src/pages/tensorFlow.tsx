import FirstStep from "@/components/FirstStep";
import { useCallback, useEffect, useRef, useState } from "react";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import FourStep from "@/components/FourStep";
import ImageInformations from "@/components/tensorFlow/imageInformations";
import { createCanvasRectStroke } from "@/lib/createCanvas";
import("@tensorflow/tfjs-backend-cpu");
import("@tensorflow/tfjs-backend-webgl");

export default function TensorFlow() {
  const [image, setImage] = useState<File>();
  const [detectedObjects, setDetectedObjects] =
    useState<cocoSsd.DetectedObject[]>();
  const [translateY, setTranslateY] = useState(0);
  const [displayCrop, setDisplayCrop] = useState(false);
  const [animate, setAnimate] = useState(false);

  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const detectObject = useCallback(async () => {
    const img = imageRef.current;
    if (!img) return;

    const model = await cocoSsd.load();
    const predictions = await model.detect(img);
    setDetectedObjects(predictions);

    console.log("Predictions: ", predictions);
  }, []);

  async function onAddImage(e: React.ChangeEvent<HTMLInputElement>) {
    reset();

    const files = e.target.files;
    if (files && files.length > 0) {
      setImage(files[0]);
    }
  }

  const getFacePosition = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!ctx) return;

    detectedObjects?.forEach((object) => {
      const box = object.bbox;
      const x = box[0];
      const y = box[1];
      const w = box[2];
      const h = box[3];
      const strokeDimension = { x, y, w, h };
      ctx.fillStyle = "orange";
      ctx.font = "16px Arial";
      ctx.fillText(object.class, x, y > 10 ? y - 5 : y + 10);
      createCanvasRectStroke(ctx, "red", strokeDimension);
    });
  }, [detectedObjects]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const currentImage = imageRef.current;

    if (!canvas || !image || !imageRef) return;

    detectObject();

    const img = new Image();
    img.src = URL.createObjectURL(image);

    img.onload = () => {
      canvas.width = currentImage!.clientWidth;
      canvas.height = currentImage!.clientHeight;
    };
  }, [image, detectObject]);

  useEffect(() => {
    if (detectedObjects) {
      getFacePosition();
    }
  }, [detectedObjects, getFacePosition]);

  function displayCropZone() {
    setDisplayCrop((prev) => !prev);
  }

  function animateCropZone() {
    setAnimate((prev) => !prev);
  }

  function reset() {
    setImage(undefined);
    setDisplayCrop(false);
    setAnimate(false);
    setTranslateY(0);
    clearCanvas();
  }

  function clearCanvas() {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!ctx) return;

    ctx.reset();
  }

  function getMidPoint() {}

  return (
    <div className="flex w-full h-full items-center">
      <FirstStep image={image} onAddImage={onAddImage} />
      <div className="bg-neutral-100 h-[70%] w-[1px]"></div>
      <FourStep
        image={image}
        previewRef={imageRef}
        canvasRef={canvasRef}
        transformY={translateY}
        displayCrop={displayCrop}
        animate={animate}
        getFacePosition={getFacePosition}
        getMidPoint={getMidPoint}
        displayCropZone={displayCropZone}
        animateCropZone={animateCropZone}
      />
      <div className="bg-neutral-100 h-[40%] w-[1px]"></div>
      <ImageInformations detectedObjects={detectedObjects} />
    </div>
  );
}
