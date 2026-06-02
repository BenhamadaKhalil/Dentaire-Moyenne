import { isValidGrade } from "../utils";

interface Props {
  value: string;
  onChange: (v: string) => void;
  label: string;
  labelColor?: string;
  inputClass?: string; // additional Tailwind classes for the input element
}

export default function GradeInput({ value, onChange, label, labelColor = "text-slate-400", inputClass }: Props) {
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
        className={`w-full ${inputClass ? inputClass : ""} text-center rounded-lg border px-1 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-slate-300 hover:border-slate-300 transition-all shadow-sm ${valid ? "border-slate-300 bg-white text-slate-800 focus:border-slate-500" : "border-red-300 bg-red-50 text-red-600 focus:border-red-500"}`}
      />
    </div>
  );
}
