import { StatBlockProps } from "./interface";

const StatBlock = ({
  value,
  label,
  color = "text-primary-500",
}: StatBlockProps) => (
  <div className="flex flex-col items-center gap-1">
    <p className={`text-lg ${color}`}>{value}</p>
    <p className="text-sm text-light-2">{label}</p>
  </div>
);

export default StatBlock;
