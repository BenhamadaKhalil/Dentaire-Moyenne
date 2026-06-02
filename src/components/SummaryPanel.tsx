import type { Module, GradesMap } from "../types";
import { calcNote, typeConfig } from "../utils";
import ScoreBadge from "./ScoreBadge";

interface Props {
  modules: Module[];
  grades: GradesMap;
  totalCoef: number;
}

export default function SummaryPanel({ modules, grades, totalCoef }: Props) {
  const results = modules.map((m) => ({
    ...m,
    note: calcNote(m, grades[m.id]),
  }));

  const filled = results.filter((r) => r.note !== null);
  const totalCoefFilled = filled.reduce((s, r) => s + r.coef, 0);
  const weightedSum = filled.reduce((s, r) => s + r.note! * r.coef, 0);
  const moyenne = totalCoefFilled > 0 ? weightedSum / totalCoefFilled : null;
  const passing = filled.filter((r) => r.note! >= 10).length;
  const failing = filled.filter((r) => r.note! < 10).length;

  type Status = { label: string; emoji: string; className: string };
  const status: Status | null =
    moyenne === null
      ? null
      : moyenne >= 14
      ? { label: "Mention Très Bien", emoji: "🏆", className: "bg-emerald-50 border-emerald-200 text-emerald-700" }
      : moyenne >= 12
      ? { label: "Mention Bien", emoji: "✅", className: "bg-sky-50 border-sky-200 text-sky-700" }
      : moyenne >= 10
      ? { label: "Admis", emoji: "🎓", className: "bg-amber-50 border-amber-200 text-amber-700" }
      : { label: "Insuffisant", emoji: "⚠️", className: "bg-red-50 border-red-200 text-red-600" };

  const progressPct = (filled.length / modules.length) * 100;

  return (
    <div className="sticky top-4 flex flex-col gap-3">
      {/* Main score card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <h2 className="text-sm font-semibold text-slate-500 mb-4 uppercase tracking-wider">
          Récapitulatif
        </h2>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-400">Modules renseignés</span>
            <span className="font-semibold text-slate-700">
              {filled.length}/{modules.length}
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-sky-400 to-emerald-400 transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Coef comptabilisés</span>
            <span className="font-semibold text-slate-700">
              {totalCoefFilled}/{totalCoef}
            </span>
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-400 mb-1">Moyenne générale</p>
          <div
            className={`text-5xl font-black tracking-tight ${
              moyenne === null
                ? "text-slate-200"
                : moyenne >= 10
                ? "text-slate-900"
                : "text-red-500"
            }`}
          >
            {moyenne !== null ? moyenne.toFixed(2) : "—"}
            {moyenne !== null && (
              <span className="text-lg font-normal text-slate-400"> /20</span>
            )}
          </div>

          {status && (
            <div
              className={`mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-sm font-semibold ${status.className}`}
            >
              {status.emoji} {status.label}
            </div>
          )}
        </div>
      </div>

      {/* Pass / fail counters */}
      {filled.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 text-center">
              <div className="text-2xl font-black text-emerald-600">{passing}</div>
              <div className="text-[11px] text-emerald-500 mt-0.5">Modules ≥ 10</div>
            </div>
            <div className="bg-red-50 border border-red-100 rounded-xl p-3 text-center">
              <div className="text-2xl font-black text-red-500">{failing}</div>
              <div className="text-[11px] text-red-400 mt-0.5">Modules &lt; 10</div>
            </div>
          </div>
        </div>
      )}

      {/* Module detail list */}
      {filled.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
          <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">
            Détail
          </h3>
          <div className="space-y-2">
            {results.map((r) => {
              const cfg = typeConfig(r.type);
              return (
                <div key={r.id} className="flex items-center justify-between text-sm gap-2">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 ${cfg.dot}`}
                    />
                    <span className="text-slate-600 truncate text-xs">{r.name}</span>
                    <span className="text-slate-300 text-[11px] shrink-0">×{r.coef}</span>
                  </div>
                  <ScoreBadge note={r.note} />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
        <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">
          Formules
        </h3>
        <div className="space-y-2 text-[11px] text-slate-500">
          <div className="flex items-start gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-400 mt-0.5 shrink-0" />
            <span>TP : <span className="font-mono">(TP×2 + moy_ctrl) / 3</span></span>
          </div>
          <div className="flex items-start gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 mt-0.5 shrink-0" />
            <span>TD : <span className="font-mono">(TD + moy_ctrl) / 2</span></span>
          </div>
          <div className="flex items-start gap-2">
            <span className="w-2 h-2 rounded-full bg-violet-400 mt-0.5 shrink-0" />
            <span>3 Ctrl : <span className="font-mono">(C1+C2+C3) / 3</span></span>
          </div>
          <div className="flex items-start gap-2">
            <span className="w-2 h-2 rounded-full bg-slate-400 mt-0.5 shrink-0" />
            <span>2 Ctrl : <span className="font-mono">(C1+C2) / 2</span></span>
          </div>
          <div className="flex items-start gap-2">
            <span className="w-2 h-2 rounded-full bg-orange-400 mt-0.5 shrink-0" />
            <span>1 Ctrl : <span className="font-mono">C1</span></span>
          </div>
        </div>
      </div>
    </div>
  );
}
