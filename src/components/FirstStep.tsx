import { ChangeEvent } from "react";
import StepTitle from "./StepTitle";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";

type Props = {
  image?: File;
  onAddImage: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function FirstStep({ image, onAddImage }: Props) {
  const { toast } = useToast();

  return (
    <div className="w-[33vw] h-full flex flex-col items-center px-8 py-4 gap-24 pt-40">
      <StepTitle stepNumber={1} title="User import his photo" showContent />

      <Button variant="secondary" className="relative">
        <input
          type="file"
          onChange={(e) => {
            onAddImage(e);
            toast({
              title: "Image imported",
              description: "Image has been imported successfully ! 🎉",
            });
          }}
          className="bg-blue-300 w-full h-full absolute opacity-0 cursor-pointer"
        />
        <label>Import your photo</label>
      </Button>

      <span>{image?.name}</span>
    </div>
  );
}
