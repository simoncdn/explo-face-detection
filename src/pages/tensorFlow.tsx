import FirstStep from "@/components/FirstStep";
import FourStep from "@/components/FourStep";
import { useCallback, useEffect, useRef, useState } from "react";
import { createCanvasRect, createCanvasRectStroke } from "@/lib/createCanvas";
import * as faceDetection from "@tensorflow-models/face-detection";

export default function TensorFlow() {
  const [image, setImage] = useState<File>();
  const [faceData, setFaceData] = useState<faceDetection.Face[]>();
  const [translateY, setTranslateY] = useState(0);
  const [displayCrop, setDisplayCrop] = useState(false);
  const [animate, setAnimate] = useState(false);

  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  async function onAddImage(e: React.ChangeEvent<HTMLInputElement>) {
    reset();

    const files = e.target.files;
    if (files && files.length > 0) {
      setImage(files[0]);
    }
  }

  async function loadModels() {
    try {
      const model = faceDetection.SupportedModels.MediaPipeFaceDetector;
      const detector = await faceDetection.createDetector(model, {
        runtime: "tfjs",
      });
      return detector;
    } catch (e) {
      console.log("Error loading models", e);
    }
  }

  const detectFace = useCallback(async () => {
    const detector = await loadModels();
    const currentImage = imageRef.current;

    if (currentImage && detector) {
      const estimationConfig = { flipHorizontal: false };
      const faces = await detector.estimateFaces(image, estimationConfig);
      console.log(faces);
      setFaceData(faces);
    }
  }, [imageRef]);

  // INIT WEB WORKER

  useEffect(() => {
    const canvas = canvasRef.current;
    const currentImage = imageRef.current;

    if (!canvas || !image || !imageRef) return;

    detectFace();

    const img = new Image();
    img.src = URL.createObjectURL(image);

    img.onload = () => {
      canvas.width = currentImage!.clientWidth;
      canvas.height = currentImage!.clientHeight;
    };
  }, [image, detectFace]);

  function getFacePosition() {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!ctx) return;

    faceData?.forEach((face) => {
      const { left, right, top, bottom } = face.relativeBox;
      const pointerDimension = {
        x: left * canvas.width + ((right - left) * canvas.width) / 2,
        y: top * canvas.height + ((bottom - top) * canvas.height) / 2,
        w: 10,
        h: 10,
      };
      const strokeDimension = {
        x: left * canvas.width,
        y: top * canvas.height,
        w: (right - left) * canvas.width,
        h: (bottom - top) * canvas.height,
      };
      createCanvasRect(ctx, "red", pointerDimension);
      createCanvasRectStroke(ctx, "orange", strokeDimension);
    });
  }

  function getMidPointDimension() {
    const midPointX = faceData?.reduce((acc, face) => {
      return (
        acc +
        (face.relativeBox.left +
          (face.relativeBox.right - face.relativeBox.left) / 2) /
          faceData.length
      );
    }, 0);
    const midPointY = faceData?.reduce((acc, face) => {
      return (
        acc +
        (face.relativeBox.top +
          (face.relativeBox.bottom - face.relativeBox.top) / 2) /
          faceData.length
      );
    }, 0);
    return {
      x: midPointX,
      y: midPointY,
      w: 10,
      h: 10,
    };
  }

  function getMidPoint() {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!ctx || !image) return;

    const midPointDimension = getMidPointDimension();
    if (!midPointDimension.x || !midPointDimension.y) return;
    const midPoint = {
      x: midPointDimension.x * canvas.width,
      y: midPointDimension.y * canvas.height,
      w: 10,
      h: 10,
    };

    getTranslateY(midPointDimension.y);
    createCanvasRect(ctx, "blue", midPoint);
  }
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

  function getTranslateY(midPointY: number) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const cropSize = 350;

    const translateY = midPointY * canvas.height - cropSize / 2;
    setTranslateY(translateY);
  }

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
    </div>
  );
}
