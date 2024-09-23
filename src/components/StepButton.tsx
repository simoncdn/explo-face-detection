import { BsFillEyeSlashFill } from "react-icons/bs";
import { IoEyeSharp } from "react-icons/io5";
import { Button } from "./ui/button";

type Props = {
  showContent: boolean;
  toggleShowContent: () => void;
};
export default function StepButton({ showContent, toggleShowContent }: Props) {
  return (
    <Button
      onClick={toggleShowContent}
      className="absolute top-8 right-8 flex gap-2"
    >
      {showContent ? (
        <>
          Hide
          <BsFillEyeSlashFill className="text-xl" />
        </>
      ) : (
        <>
          Show
          <IoEyeSharp className="text-xl" />
        </>
      )}
    </Button>
  );
}
