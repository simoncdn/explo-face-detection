import clsx from "clsx";

type Props = {
  stepNumber: number;
  title: string;
  showContent: boolean;
};

export default function StepTitle({ stepNumber, title }: Props) {
  return (
    <h2 className={clsx("text-2xl flex gap-4 flex-col items-center")}>
      <span className="font-bold underline">STEP {stepNumber}</span>
      <span className="italic">{title}</span>
    </h2>
  );
}
