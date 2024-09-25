import { useCallback, useEffect, useRef, useState } from "react";

export default function useModel() {
  const [currentModelId, setCurrentModel] = useState<string>();
  const [detectedObjects, setDetectedObjects] = useState<unknown>();
  const [perf, setPerf] = useState<number>();

  const modelWorkerRef = useRef<Worker>();

  function addModel(modelId: string) {
    setCurrentModel(modelId);
  }

  // function loadModel(file: File) {
  //   const worker = modelWorkerRef.current;
  //   console.log("worker", worker);
  //   if (!worker) return;
  //   worker.postMessage({ file });
  // }

  const postModelWorkerMessage = useCallback(
    async (file: File) => {
      console.log("modelREf", modelWorkerRef.current);
      if (!modelWorkerRef.current) return;

      const worker = modelWorkerRef.current;
      worker.postMessage({ file: file });
    },
    [modelWorkerRef],
  );

  function clearModel() {
    setCurrentModel(undefined);
  }

  function getModelWorker(modelId: string): Worker {
    const modelWorkerFind = models.find((model) => model.id === modelId);

    if (!modelWorkerFind) {
      throw new Error(`Model with id ${modelId} not found`);
    }

    const modelWorker = new Worker(
      new URL(modelWorkerFind.workerPath, import.meta.url),
      { type: "module" },
    );
    return modelWorker;
  }

  // worker Init
  useEffect(() => {
    if (!currentModelId) return;

    const modelWorker = getModelWorker(currentModelId);
    modelWorkerRef.current = modelWorker;

    modelWorker.onmessage = async (e) => {
      const { type, predictions, performanceDetection } = e.data;

      if (type === "predictions") {
        setDetectedObjects(predictions);
        setPerf(performanceDetection);
      } else if (type === "error") {
        console.error("Error: ", e.data.message);
      }
    };

    return () => {
      modelWorker.terminate();
    };
  }, [currentModelId]);

  return { currentModelId, addModel, perf, postModelWorkerMessage };
}
