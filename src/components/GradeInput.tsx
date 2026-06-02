import { isValidGrade } from "../utils";

interface Props {
  value: string;
  onChange: (v: string) => void;
  label: string;
  labelColor?: string;
}

export default function GradeInput({ value, onChange, label, labelColor = "text-slate-400" }: Props) {
  const valid = isValidGrade(value);
  return (
    <div className="flex flex-col gap-1">
      <label className={`text-[11px] font-semibold text-center block ${labelColor}`}>{label}</label>
      <input
        type="number"
        min={0}
        max={20}
        step={0.01}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="—"
        className={`w-full text-center rounded-lg border px-1 py-2 text-sm font-semibold focus:outline-none focus:ring-2 transition-all
          ${valid
            ? "border-slate-200 bg-white text-slate-800 focus:ring-slate-300 focus:border-slate-400"
            : "border-red-300 bg-red-50 text-red-600 focus:ring-red-200"
          }`}
      />
    </div>
  );
}
