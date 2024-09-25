import BlazefaceWorker from "../lib/workers/blazefaceWorker?worker";
import XmpMetadataWorker from "../lib/workers/xmpMetadataWorker?worker";
import TensorFlowWorker from "../lib/workers/tensorFlowWorker?worker";
import MediaPipeFaceDetector from "../lib/workers/mediaPipeFaceDetector?worker";

interface WorkerConstructor {
  new (options?: { name?: string }): Worker;
}

export type Model = {
  id: string;
  name: string;
  Worker: WorkerConstructor;
};

export const models: Model[] = [
  {
    id: crypto.randomUUID(),
    name: "Xmp metadata",
    Worker: XmpMetadataWorker,
  },
  {
    id: crypto.randomUUID(),
    name: "TensorFlow - Object detection",
    Worker: TensorFlowWorker,
  },
  {
    id: crypto.randomUUID(),
    name: "TensorFlow - Single Face detection",
    Worker: MediaPipeFaceDetector,
  },
  {
    id: crypto.randomUUID(),
    name: "Blazeface - Multiple Face detection",
    Worker: BlazefaceWorker,
  },
];
