import useDisplayContent from "@/hooks/useDisplayContent";
import StepButton from "./StepButton";
import StepTitle from "./StepTitle";
import { Button } from "./ui/button";
import { clsx } from "clsx";

type Props = {
  image?: File;
  canvasRef?: any;
  previewRef?: any;
  transformY?: number;
  displayCrop?: boolean;
  animate?: boolean;
  getFacePosition: () => void;
  getMidPoint: () => void;
  displayCropZone: () => void;
  animateCropZone: () => void;
};
export default function FourStep({
  image,
  canvasRef,
  previewRef,
  transformY,
  displayCrop,
  animate,
  getFacePosition,
  getMidPoint,
  displayCropZone,
  animateCropZone,
}: Props) {
  const { showContent, toggleShowContent } = useDisplayContent();

  const buttons = [
    {
      label: "Face position",
      onClick: () => getFacePosition(),
    },
    {
      label: "Mid point",
      onClick: () => getMidPoint(),
    },
    {
      label: "Display crop zone",
      onClick: displayCropZone,
    },
    {
      label: "Auto crop",
      onClick: animateCropZone,
    },
  ];

  return (
    <div className="relative w-[33%] h-full flex flex-col items-center px-8 py-4 gap-6 pt-40">
      <StepButton
        showContent={showContent}
        toggleShowContent={toggleShowContent}
      />
      <StepTitle
        stepNumber={3}
        title="Auto crop the image"
        showContent={showContent}
      />

      <div
        className={clsx(
          "relative flex justify-center items-center",
          showContent ? "opacity-1" : "opacity-0",
        )}
      >
        {displayCrop && (
          <div
            className={clsx(
              "bg-purple-400 z-10 my-auto top-1 w-[98%] h-[350px] absolute opacity-30 border border-4 border-dashed",
            )}
            style={{
              transform: animate
                ? `translateY(${transformY}px)`
                : "translateY(0)",
              transition: "transform 1s",
            }}
          ></div>
        )}

        {image ? (
          <div className="relative">
            <img
              ref={previewRef}
              src={URL.createObjectURL(image)}
              alt={image.name}
            />
            <canvas ref={canvasRef} className="absolute top-0 left-0" />
          </div>
        ) : (
          <h2>Error</h2>
        )}
      </div>

      <div
        className={clsx(
          "flex flex-wrap gap-2",
          showContent ? "opacity-1" : "opacity-0",
        )}
      >
        {buttons.map((button, index) => (
          <Button
            variant="secondary"
            key={`${button.label} + ${index}`}
            onClick={button.onClick}
          >
            {button.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
