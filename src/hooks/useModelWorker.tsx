import { Model } from "@/constant/model";
import { useCallback, useEffect, useRef, useState } from "react";

type UseModelWorkerProps = {
  model: Model | undefined;
};

export type DetectedObject = {
  box: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  classDetection?: string;
  scoreDetection?: number;
};

export default function useModelWorker({ model }: UseModelWorkerProps) {
  const [detectedObjects, setDetectedObjects] = useState<DetectedObject[]>();
  const [perfDuration, setPerfDuration] = useState<number>();
  const modelWorkerRef = useRef<Worker>();

  function clearDetectedObjects() {
    setDetectedObjects(undefined);
  }

  async function detectObject(file: File) {
    clearDetectedObjects();
    const worker = modelWorkerRef.current;
    if (!worker) return;
    worker.postMessage({ file });
  }

  // Worker Init
  useEffect(() => {
    if (!model) return;
    const modelWorker = new Worker(new URL(model.workerPath, import.meta.url), {
      type: "module",
    });

    modelWorkerRef.current = modelWorker;

    modelWorker.onmessage = async (e) => {
      const { type, predictions, performanceDetection } = e.data;

      if (type === "predictions") {
        setDetectedObjects(predictions);
        setPerfDuration(performanceDetection);
      } else if (type === "error") {
        console.error("Error: ", e.data.message);
      }
    };

    return () => {
      modelWorker.terminate();
    };
  }, [model]);

  return { detectedObjects, perfDuration, detectObject };
}
