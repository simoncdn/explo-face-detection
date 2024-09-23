import useDisplayContent from "@/hooks/useDisplayContent";
import StepTitle from "./StepTitle";
import clsx from "clsx";
import StepButton from "./StepButton";

type Props = {
  image?: File;
  previewRef: any;
  canvasRef: any;
};

export default function ThirdStep({ image, previewRef, canvasRef }: Props) {
  const { showContent, toggleShowContent } = useDisplayContent();

  return (
    <div className="relative w-[25%] h-full flex flex-col items-center px-8 py-4 gap-6 pt-40 border-r border-dashed">
      <StepButton
        showContent={showContent}
        toggleShowContent={toggleShowContent}
      />
      <StepTitle
        stepNumber={3}
        title="calcul the center"
        showContent={showContent}
      />

      <div
        className={clsx(
          "relative flex justify-center items-center",
          showContent ? "opacity-1" : "opacity-0",
        )}
      >
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
    </div>
  );
}
