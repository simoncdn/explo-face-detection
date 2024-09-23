import clsx from "clsx";
import useDisplayContent from "@/hooks/useDisplayContent";
import StepTitle from "./StepTitle";
import StepButton from "./StepButton";

enum LogMetadata {
  MAKE = "Make",
  MODEL = "Model",
  REGIONS = "Regions",
  ORIENTATION = "Orientation",
}

type Props = {
  imageMetadata?: Record<string, unknown>;
};
export default function SecondStep({ imageMetadata }: Props) {
  const { showContent, toggleShowContent } = useDisplayContent();
  const usefullInformations =
    imageMetadata &&
    Object.entries(imageMetadata).filter(
      ([key]) =>
        key === LogMetadata.REGIONS ||
        key === LogMetadata.ORIENTATION ||
        key === LogMetadata.MAKE ||
        key === LogMetadata.MODEL,
    );

  return (
    <div className="relative w-[33vw] h-full flex flex-col items-center px-8 py-4 gap-6 pt-40">
      <StepButton
        showContent={showContent}
        toggleShowContent={toggleShowContent}
      />
      <StepTitle
        stepNumber={2}
        title="Get XMP metadata"
        showContent={showContent}
      />

      <div className="w-full h-full flex flex-col gap-12">
        <div
          className={clsx(
            "w-full h-full max-h-[25vh] overflow-y-scroll text-wrap",
            showContent ? "opacity-1" : "opacity-0",
          )}
        >
          <ul>
            {imageMetadata &&
              Object.entries(imageMetadata).map(([key, value]) => (
                <li key={key}>
                  <span
                    className={clsx(
                      key === LogMetadata.REGIONS && "bg-orange-300 text-black",
                      key === LogMetadata.MAKE && "bg-violet-300 text-black",
                      key === LogMetadata.MODEL && "bg-red-300 text-black",
                      key === LogMetadata.ORIENTATION &&
                        "bg-blue-300 text-black",
                      "text-wrap",
                    )}
                  >
                    {key}:
                  </span>
                  <span className="break-words">{JSON.stringify(value)}</span>
                </li>
              ))}
          </ul>
        </div>

        <div
          className={clsx(
            "w-full h-full",
            showContent ? "opacity-1" : "opacity-0",
          )}
        >
          <h2 className="text-xl font-bold underline mb-2">
            Useful information
          </h2>

          <ul>
            {usefullInformations &&
              usefullInformations.map(([key, value]) => (
                <li key={key}>
                  <span
                    className={clsx(
                      key === LogMetadata.REGIONS && "bg-orange-300 text-black",
                      key === LogMetadata.MAKE && "bg-violet-300 text-black",
                      key === LogMetadata.MODEL && "bg-red-300 text-black",
                      key === LogMetadata.ORIENTATION &&
                        "bg-blue-300 text-black",
                      "text-wrap",
                    )}
                  >
                    {key}:
                  </span>
                  <span className="break-words">{JSON.stringify(value)}</span>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
