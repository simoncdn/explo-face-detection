import clsx from "clsx";

type Props = {
  stepNumber: number;
  title: string;
  showContent: boolean;
};

export default function StepTitle({ stepNumber, title, showContent }: Props) {
  return (
    <h2
      className={clsx(
        "text-3xl flex gap-2",
        showContent ? "opacity-1" : "opacity-0",
      )}
    >
      <span className="font-bold underline">Step {stepNumber}: </span>
      <span>{title}</span>
    </h2>
  );
}
