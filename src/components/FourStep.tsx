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
  getMidPoint,
  displayCropZone,
  animateCropZone,
}: Props) {
  const buttons = [
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
      <StepTitle stepNumber={2} title="Detection and adjustment" />

      <div className={clsx("relative flex justify-center items-center")}>
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

      <div className={clsx("flex flex-wrap gap-2")}>
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
