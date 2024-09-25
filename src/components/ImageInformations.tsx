import { DetectedObject } from "@/hooks/useModelWorker";
import clsx from "clsx";

type Props = {
  detectedObjects?: DetectedObject[];
  perf?: number;
};

export default function ImageInformations({ detectedObjects, perf }: Props) {
  return (
    <div className="relative w-[33vw] h-full flex flex-col px-8 py-4 gap-6 pt-40">
      <h2 className="text-xl font-bold underline text-center">Informations</h2>

      <p className="flex gap-2 items-center">
        <span className="text-lg underline">Detection time:</span>
        <span
          className={clsx(
            "font-bold text-2xl",
            perf && perf < 400
              ? "text-green-500"
              : perf && perf < 800
                ? "text-orange-500"
                : "text-red-500",
          )}
        >
          {perf?.toFixed(2)} ms
        </span>
      </p>

      <p className="flex gap-2 items-center">
        <span className="text-lg underline">Detected objects:</span>
        <span className="font-bold text-white text-2xl">
          {detectedObjects?.length}
        </span>
      </p>

      {detectedObjects &&
        detectedObjects.map((object, index) => (
          <ul key={index} className="flex flex-col gap-6">
            <li>
              <p className="flex gap-2 items-center">
                <span className="text-lg underline font-bold">
                  Object {index + 1} :
                </span>
              </p>

              <p className="ml-4 flex gap-2 items-center">
                <span>Detection type :</span>

                <span className="text-white text-2xl">
                  {object.classDetection ? (
                    <span>{object.classDetection}</span>
                  ) : (
                    <span>No detection type</span>
                  )}
                </span>
              </p>

              <p className="ml-4 flex gap-2 items-center">
                <span>Score detection :</span>

                <span className="text-white text-2xl">
                  {object.scoreDetection ? (
                    <span>{object.scoreDetection} %</span>
                  ) : (
                    <span>No detection score</span>
                  )}
                </span>
              </p>

              <div className="ml-4 flex gap-2 flex-col">
                <span>Relative Box :</span>
                {object?.box && (
                  <ul key={`${object.box.x} + ${index}`} className="ml-2">
                    <li>
                      X :
                      <span className="font-bold text-white">
                        {(object.box.x * 100).toFixed(2)}%
                      </span>
                    </li>
                    <li>
                      Y :
                      <span className="font-bold text-white">
                        {(object.box.y * 100).toFixed(2)}%
                      </span>
                    </li>
                    <li>
                      Width :
                      <span className="font-bold text-white">
                        {(object.box.width * 100).toFixed(2)}%
                      </span>
                    </li>
                    <li>
                      Height :
                      <span className="font-bold text-white">
                        {(object.box.height * 100).toFixed(2)}%
                      </span>
                    </li>
                  </ul>
                )}
              </div>
            </li>
          </ul>
        ))}
    </div>
  );
}
