import { scoreColor } from "../utils";

interface Props {
  note: number | null;
  size?: "sm" | "md";
}

export default function ScoreBadge({ note, size = "sm" }: Props) {
  if (note === null)
    return <span className="text-slate-300 text-sm font-medium">—</span>;

  const s = note;
  const cls = scoreColor(s);
  const px = size === "md" ? "px-3 py-1.5 text-base" : "px-2.5 py-1 text-sm";

  return (
    <span className={`inline-block rounded-full font-bold ${px} ${cls}`}>
      {s.toFixed(2)}
    </span>
  );
}
