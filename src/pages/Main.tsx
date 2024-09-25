import FirstStep from "@/components/FirstStep";
import { useEffect, useRef, useState } from "react";
import FourStep from "@/components/FourStep";
import { createCanvasRectStroke } from "@/lib/createCanvas";
import { Model } from "@/constant/model";
import useModelWorker, { DetectedObject } from "@/hooks/useModelWorker";
import ImageInformations from "@/components/ImageInformations";

import("@tensorflow/tfjs-backend-cpu");
import("@tensorflow/tfjs-backend-webgl");

type MainProps = {
  model: Model | undefined;
  addModel: (modelId: string) => void;
};

export default function Main({ model, addModel }: MainProps) {
  const [image, setImage] = useState<File>();
  const [translateY, setTranslateY] = useState(0);
  const [displayCrop, setDisplayCrop] = useState(false);
  const [animate, setAnimate] = useState(false);

  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const {
    detectedObjects,
    perfDuration: perf,
    detectObject,
  } = useModelWorker({
    model,
  });

  async function onAddImage(e: React.ChangeEvent<HTMLInputElement>) {
    reset();

    const files = e.target.files;
    if (files && files.length > 0) {
      setImage(files[0]);
      await detectObject(files[0]);
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const currentImage = imageRef.current;

    if (!detectedObjects || !canvas || !currentImage || !image) return;

    const img = new Image();
    img.src = URL.createObjectURL(image);

    img.onload = () => {
      canvas.width = currentImage.clientWidth;
      canvas.height = currentImage.clientHeight;
      getFacePosition(detectedObjects);
    };

    getFacePosition(detectedObjects);
  }, [detectedObjects, imageRef, image]);

  const getFacePosition = (detectedObjects: DetectedObject[]) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!ctx || !canvas || !detectedObjects) return;

    detectedObjects.forEach((object) => {
      const box = object.box;
      const x = box.x * canvas.width;
      const y = box.y * canvas.height;
      const w = box.width * canvas.width;
      const h = box.height * canvas.height;

      if (object.classDetection) {
        ctx.fillStyle = "orange";
        ctx.font = "16px Arial";
        ctx.fillText(object.classDetection, x, y > 10 ? y - 5 : y + 10);
      }

      const strokeDimension = { x, y, w, h };
      createCanvasRectStroke(ctx, "red", strokeDimension);
    });
  };

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
      <FirstStep image={image} onAddImage={onAddImage} addModel={addModel} />
      <div className="bg-neutral-100 h-[70%] w-[1px]"></div>
      <FourStep
        image={image}
        previewRef={imageRef}
        canvasRef={canvasRef}
        transformY={translateY}
        displayCrop={displayCrop}
        animate={animate}
        getMidPoint={getMidPoint}
        displayCropZone={displayCropZone}
        animateCropZone={animateCropZone}
      />
      <div className="bg-neutral-100 h-[40%] w-[1px]"></div>
      <ImageInformations perf={perf} detectedObjects={detectedObjects} />
    </div>
  );
}
