import faceapi from "face-api.js";

type Props = {
  faceData?: faceapi.FaceDetection[];
};

export default function ImageInformations({ faceData }: Props) {
  return (
    <div className="relative w-[33vw] h-full flex flex-col px-8 py-4 gap-6 pt-40">
      <h2 className="text-xl font-bold underline text-center">Informations</h2>

      <p className="flex gap-2 items-center">
        <span className="text-lg underline">Detected face:</span>
        <span className="font-bold text-red-600 text-2xl">
          {faceData?.length}
        </span>
      </p>

      {faceData &&
        faceData.map((face, index) => (
          <ul key={index} className="flex flex-col gap-6">
            <li>
              <p className="flex gap-2 items-center">
                <span className="text-lg underline font-bold">
                  Face {index + 1} :
                </span>
              </p>

              <p className="ml-4 flex gap-2 items-center">
                <span>Score detection :</span>

                <span className="text-red-600 text-2xl">
                  {(face.classScore * 100).toFixed(2)}%
                </span>
              </p>

              <div className="ml-4 flex gap-2 flex-col">
                <span>Relative Box :</span>

                {face?.relativeBox && (
                  <ul key={`${face.relativeBox.x} + ${index}`} className="ml-2">
                    <li>
                      Top :
                      <span className="font-bold text-red-600">
                        {(face.relativeBox.top * 100).toFixed(2)}%
                      </span>
                    </li>
                    <li>
                      Bottom :
                      <span className="font-bold text-red-600">
                        {(face.relativeBox.bottom * 100).toFixed(2)}%
                      </span>
                    </li>
                    <li>
                      Left :
                      <span className="font-bold text-red-600">
                        {(face.relativeBox.left * 100).toFixed(2)}%
                      </span>
                    </li>
                    <li>
                      Right :
                      <span className="font-bold text-red-600">
                        {(face.relativeBox.right * 100).toFixed(2)}%
                      </span>
                    </li>
                    <li>
                      Width :
                      <span className="font-bold text-red-600">
                        {(face.relativeBox.width * 100).toFixed(2)}%
                      </span>
                    </li>
                    <li>
                      Height :
                      <span className="font-bold text-red-600">
                        {(face.relativeBox.height * 100).toFixed(2)}%
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
