export type Model = {
  id: string;
  name: string;
  workerPath: string;
};

export const models: Model[] = [
  {
    id: crypto.randomUUID(),
    name: "Xmp metadata",
    workerPath: "../lib/workers/xmpMetadataWorker.ts",
  },
  {
    id: crypto.randomUUID(),
    name: "TensorFlow - Object detection",
    workerPath: "../lib/workers/tensorFlowWorker.ts",
  },
  {
    id: crypto.randomUUID(),
    name: "TensorFlow - Single Face detection",
    workerPath: "../lib/workers/mediaPipeFaceDetector.ts",
  },
  {
    id: crypto.randomUUID(),
    name: "Blazeface - Multiple Face detection",
    workerPath: "../lib/workers/blazefaceWorker.ts",
  },
];
