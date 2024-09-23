import { LegacyRef } from "react";
import StepTitle from "../StepTitle";
import clsx from "clsx";
import useDisplayContent from "@/hooks/useDisplayContent";

type Props = {
  image?: File;
  imageRef: LegacyRef<HTMLImageElement> | null;
  canvasRef: LegacyRef<HTMLCanvasElement> | null;
};

export default function SecondStep({ image, imageRef, canvasRef }: Props) {
  const { showContent } = useDisplayContent();

  return (
    <div className="relative w-[33vw] h-full flex flex-col items-center px-8 py-4 gap-6 pt-40">
      <StepTitle stepNumber={2} title="IA Detection" showContent />

      <div className="w-full h-full flex flex-col gap-12">
        <div className={clsx("w-full h-full overflow-y-scroll text-wrap")}>
          {image && (
            <div className="relative">
              <img
                ref={imageRef}
                src={URL.createObjectURL(image)}
                alt={image?.name}
              />
              <canvas ref={canvasRef} className="absolute top-0 left-0" />
            </div>
          )}
        </div>
      </div>

      <div
        className={clsx(
          "flex flex-wrap gap-2",
          showContent ? "opacity-1" : "opacity-0",
        )}
      ></div>
    </div>
  );
}
