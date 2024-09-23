import * as cocoSsd from "@tensorflow-models/coco-ssd";

type Props = {
  detectedObjects?: cocoSsd.DetectedObject[];
};

export default function ImageInformations({ detectedObjects }: Props) {
  return (
    <div className="relative w-[33vw] h-full flex flex-col px-8 py-4 gap-6 pt-40">
      <h2 className="text-xl font-bold underline text-center">Informations</h2>

      <p className="flex gap-2 items-center">
        <span className="text-lg underline">Detected objects:</span>
        <span className="font-bold text-red-600 text-2xl">
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
                <span>Object type :</span>

                <span className="text-red-600 text-2xl">{object.class}</span>
              </p>

              <p className="ml-4 flex gap-2 items-center">
                <span>Score detection :</span>

                <span className="text-red-600 text-2xl">
                  {(object.score * 100).toFixed(2)}%
                </span>
              </p>

              <div className="ml-4 flex gap-2 flex-col">
                <span>Relative Box :</span>
                {object?.bbox && (
                  <ul key={`${object.bbox[0]} + ${index}`} className="ml-2">
                    <li>
                      X :
                      <span className="font-bold text-red-600">
                        {object.bbox[0].toFixed(2)}
                      </span>
                    </li>
                    <li>
                      Y :
                      <span className="font-bold text-red-600">
                        {object.bbox[1].toFixed(2)}
                      </span>
                    </li>
                    <li>
                      Width :
                      <span className="font-bold text-red-600">
                        {object.bbox[2].toFixed(2)}
                      </span>
                    </li>
                    <li>
                      Height :
                      <span className="font-bold text-red-600">
                        {object.bbox[3].toFixed(2)}
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
