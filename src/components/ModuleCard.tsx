import type { Module, Grades } from "../types";
import { calcNote, formulaLabel, typeConfig } from "../utils";
import GradeInput from "./GradeInput";
import ScoreBadge from "./ScoreBadge";

interface Props {
  mod: Module;
  grades: Grades;
  onChange: (field: keyof Grades, value: string) => void;
}

export default function ModuleCard({ mod, grades, onChange }: Props) {
  const cfg = typeConfig(mod.type);
  const note = calcNote(mod, grades);

  const hasFormula =
    note !== null &&
    (mod.type === "tp" || mod.type === "td" || mod.type === "ctrl3" || mod.type === "ctrl2");

  return (
    <div
      className={`rounded-2xl border ${cfg.border} ${cfg.cardBg} p-4 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow duration-200`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="font-semibold text-slate-800 text-sm leading-tight truncate">
            {mod.name}
          </h3>
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            <span className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${cfg.badge}`}>
              {cfg.label}
            </span>
            <span className="text-[11px] text-slate-400">Coef {mod.coef}</span>
          </div>
        </div>
        <div className="shrink-0 mt-0.5">
          <ScoreBadge note={note} />
        </div>
      </div>

      {/* Inputs */}
      <div
        className={`grid gap-2 ${
          mod.type === "ctrl3"
            ? "grid-cols-3"
            : mod.type === "ctrl1"
            ? "grid-cols-1"
            : mod.type === "ctrl2"
            ? "grid-cols-2"
            : "grid-cols-3"
        }`}
      >
        {/* C1 — always */}
        <GradeInput
          value={grades.c1}
          onChange={(v) => onChange("c1", v)}
          label="Ctrl 1"
        />

        {/* C2 — all except ctrl1 */}
        {mod.type !== "ctrl1" && mod.id !== "paro" && mod.id !== "patho" && (
            <GradeInput
              value={grades.c2}
              onChange={(v) => onChange("c2", v)}
              label="Ctrl 2"
            />
          )}

        {/* C3 — only ctrl3 (Biomatériaux) */}
        {mod.type === "ctrl3" && (
          <GradeInput
            value={grades.c3}
            onChange={(v) => onChange("c3", v)}
            label="Ctrl 3"
          />
        )}

        {/* TP / TD — only tp and td types */}
        {(mod.type === "tp" || mod.type === "td") && (
          <GradeInput
            value={grades.practical}
            onChange={(v) => onChange("practical", v)}
            label={cfg.label}
            labelColor={cfg.labelColor}
          />
        )}
      </div>

      {/* Formula hint */}
      {hasFormula && (
        <p className="text-[10px] text-slate-400 text-right leading-snug">
          {formulaLabel(mod, grades)}
        </p>
      )}
    </div>
  );
}
