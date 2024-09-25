import { ChangeEvent } from "react";
import StepTitle from "./StepTitle";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { models } from "@/constant/model";

type Props = {
  image?: File;
  onAddImage: (e: ChangeEvent<HTMLInputElement>) => void;
  addModel: (modelId: string) => void;
};

export default function FirstStep({ image, onAddImage, addModel }: Props) {
  return (
    <div className="w-[33vw] h-full flex flex-col items-center px-8 py-4 gap-10 pt-40">
      <StepTitle
        stepNumber={1}
        title="Choose model and import a photo"
        showContent
      />

      <div className="flex flex-col gap-4 w-full max-w-80 mt-24 justify-center">
        <Select onValueChange={(value) => addModel(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select your model" />
          </SelectTrigger>
          <SelectContent>
            {models.map((model) => (
              <SelectItem key={model.id} value={model.id}>
                {model.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button variant="secondary" className="relative">
          <input
            type="file"
            onChange={(e) => onAddImage(e)}
            className="bg-blue-300 w-full h-full absolute opacity-0 cursor-pointer"
          />
          <label>Import your photo</label>
        </Button>
      </div>
      <span className="italic">{image?.name}</span>
    </div>
  );
}
