import { useState, useMemo } from "react";

const MODULES = [
  { id: "prothese",      name: "Prothèse",       coef: 5, type: "tp" },
  { id: "oce",           name: "OC/E",            coef: 5, type: "tp" },
  { id: "odf",           name: "ODF",             coef: 3, type: "tp" },
  { id: "anato",         name: "Anato-Hum",       coef: 4, type: "tp" },
  { id: "biomater",      name: "Biomatériaux",    coef: 2, type: "tp" },
  { id: "microbio",      name: "Micro-Bio",       coef: 2, type: "tp" },
  { id: "info",          name: "Info",            coef: 1, type: "tp" },
  { id: "anadent",       name: "Ana-Dent",        coef: 1, type: "td" },
  { id: "histo",         name: "Histo",           coef: 3, type: "td" },
  { id: "physio",        name: "Physio",          coef: 2, type: "td" },
  { id: "immuno",        name: "Immuno",          coef: 1, type: "td" },
  { id: "paro",          name: "Paro",            coef: 3, type: "td" },
  { id: "patho",         name: "Patho",           coef: 3, type: "td" },
  { id: "hygiene",       name: "Hygiène",         coef: 1, type: "td" },
  { id: "anglais",       name: "Anglais",         coef: 1, type: "td" },
];

const TP_COLOR = {
  bg: "bg-sky-50",
  border: "border-sky-200",
  badge: "bg-sky-100 text-sky-700",
  label: "text-sky-600",
  accent: "text-sky-500",
};
const TD_COLOR = {
  bg: "bg-emerald-50",
  border: "border-emerald-200",
  badge: "bg-emerald-100 text-emerald-700",
  label: "text-emerald-600",
  accent: "text-emerald-500",
};

function calcModule(c1, c2, practical, type) {
  const v1 = parseFloat(c1) || 0;
  const v2 = parseFloat(c2) || 0;
  const vp = parseFloat(practical) || 0;
  const moy_controles = (v1 + v2) / 2;
  if (type === "tp") {
    return (vp * 2 + moy_controles) / 3;
  } else {
    return (vp + moy_controles) / 2;
  }
}

function GradeInput({ value, onChange, placeholder, max = 20 }) {
  const num = parseFloat(value);
  const valid = value === "" || (!isNaN(num) && num >= 0 && num <= max);
  return (
    <input
      type="number"
      min="0"
      max={max}
      step="0.01"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full text-center rounded-lg border px-2 py-2 text-sm font-medium focus:outline-none focus:ring-2 transition-all
        ${valid
          ? "border-slate-200 bg-white text-slate-800 focus:ring-slate-300 focus:border-slate-400"
          : "border-red-300 bg-red-50 text-red-700 focus:ring-red-200"
        }`}
    />
  );
}

function ScoreBadge({ score }) {
  if (score === null) return <span className="text-slate-300 text-sm">—</span>;
  const s = parseFloat(score.toFixed(2));
  let color =
    s >= 16 ? "bg-emerald-100 text-emerald-700"
    : s >= 12 ? "bg-sky-100 text-sky-700"
    : s >= 10 ? "bg-amber-100 text-amber-700"
    : "bg-red-100 text-red-700";
  return (
    <span className={`inline-block px-2.5 py-1 rounded-full text-sm font-semibold ${color}`}>
      {s.toFixed(2)}
    </span>
  );
}

function ModuleCard({ mod, grades, onChange }) {
  const colors = mod.type === "tp" ? TP_COLOR : TD_COLOR;
  const { c1, c2, practical } = grades;
  const allFilled = c1 !== "" && c2 !== "" && practical !== "";
  const note = allFilled ? calcModule(c1, c2, practical, mod.type) : null;

  return (
    <div className={`rounded-2xl border ${colors.border} ${colors.bg} p-4 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow`}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-semibold text-slate-800 text-sm leading-tight">{mod.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${colors.badge}`}>
              {mod.type.toUpperCase()}
            </span>
            <span className="text-xs text-slate-400">Coef {mod.coef}</span>
          </div>
        </div>
        <ScoreBadge score={note} />
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div>
          <label className="text-xs text-slate-500 mb-1 block text-center">Ctrl 1</label>
          <GradeInput value={c1} onChange={(v) => onChange("c1", v)} placeholder="—" />
        </div>
        <div>
          <label className="text-xs text-slate-500 mb-1 block text-center">Ctrl 2</label>
          <GradeInput value={c2} onChange={(v) => onChange("c2", v)} placeholder="—" />
        </div>
        <div>
          <label className={`text-xs mb-1 block text-center font-medium ${colors.label}`}>
            {mod.type === "tp" ? "TP" : "TD"}
          </label>
          <GradeInput value={practical} onChange={(v) => onChange("practical", v)} placeholder="—" />
        </div>
      </div>

      {allFilled && note !== null && (
        <div className="text-xs text-slate-400 text-right">
          {mod.type === "tp"
            ? `(${parseFloat(practical).toFixed(2)}×2 + (${parseFloat(c1).toFixed(2)}+${parseFloat(c2).toFixed(2)})/2) / 3`
            : `(${parseFloat(practical).toFixed(2)} + (${parseFloat(c1).toFixed(2)}+${parseFloat(c2).toFixed(2)})/2) / 2`}
        </div>
      )}
    </div>
  );
}

function SummaryPanel({ modules, grades }) {
  const results = useMemo(() => {
    return modules.map((mod) => {
      const g = grades[mod.id] || {};
      const { c1 = "", c2 = "", practical = "" } = g;
      const allFilled = c1 !== "" && c2 !== "" && practical !== "";
      const note = allFilled ? calcModule(c1, c2, practical, mod.type) : null;
      return { ...mod, note };
    });
  }, [modules, grades]);

  const filled = results.filter((r) => r.note !== null);
  const totalCoefFilled = filled.reduce((s, r) => s + r.coef, 0);
  const totalCoefAll = modules.reduce((s, m) => s + m.coef, 0);
  const weightedSum = filled.reduce((s, r) => s + r.note * r.coef, 0);
  const moyenne = totalCoefFilled > 0 ? weightedSum / totalCoefFilled : null;

  const passing = filled.filter((r) => r.note >= 10).length;
  const failing = filled.filter((r) => r.note < 10).length;

  const status =
    moyenne === null ? null
    : moyenne >= 12 ? { label: "Mention Bien", color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200" }
    : moyenne >= 10 ? { label: "Admis", color: "text-sky-600", bg: "bg-sky-50 border-sky-200" }
    : { label: "Insuffisant", color: "text-red-600", bg: "bg-red-50 border-red-200" };

  return (
    <div className="sticky top-4 flex flex-col gap-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <h2 className="text-base font-semibold text-slate-700 mb-4">Récapitulatif</h2>

        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-500">Modules renseignés</span>
            <span className="font-semibold text-slate-800">{filled.length}/{modules.length}</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-sky-400 to-emerald-400 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(filled.length / modules.length) * 100}%` }}
            />
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-500">Coef comptabilisés</span>
            <span className="font-semibold text-slate-800">{totalCoefFilled}/{totalCoefAll}</span>
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-slate-100">
          <div className="text-xs text-slate-400 mb-1 text-center">Moyenne générale</div>
          <div className={`text-4xl font-bold text-center ${moyenne === null ? "text-slate-200" : moyenne >= 10 ? "text-slate-800" : "text-red-500"}`}>
            {moyenne !== null ? moyenne.toFixed(2) : "—"}
            {moyenne !== null && <span className="text-base font-normal text-slate-400"> / 20</span>}
          </div>

          {status && (
            <div className={`mt-3 text-center text-sm font-semibold px-3 py-1.5 rounded-xl border ${status.bg} ${status.color}`}>
              {status.label}
            </div>
          )}
        </div>
      </div>

      {filled.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-emerald-50 rounded-xl p-3 text-center border border-emerald-100">
              <div className="text-2xl font-bold text-emerald-600">{passing}</div>
              <div className="text-xs text-emerald-500 mt-0.5">Modules ≥ 10</div>
            </div>
            <div className="bg-red-50 rounded-xl p-3 text-center border border-red-100">
              <div className="text-2xl font-bold text-red-500">{failing}</div>
              <div className="text-xs text-red-400 mt-0.5">Modules &lt; 10</div>
            </div>
          </div>
        </div>
      )}

      {filled.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Détail modules</h3>
          <div className="flex flex-col gap-1.5">
            {results.map((r) => (
              <div key={r.id} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 min-w-0">
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${r.type === "tp" ? "bg-sky-400" : "bg-emerald-400"}`} />
                  <span className="text-slate-600 truncate">{r.name}</span>
                  <span className="text-slate-300 text-xs">×{r.coef}</span>
                </div>
                <ScoreBadge score={r.note} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const initGrades = () =>
    Object.fromEntries(MODULES.map((m) => [m.id, { c1: "", c2: "", practical: "" }]));

  const [grades, setGrades] = useState(initGrades);

  const handleChange = (id, field, value) => {
    setGrades((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  const handleReset = () => setGrades(initGrades());

  const tpModules = MODULES.filter((m) => m.type === "tp");
  const tdModules = MODULES.filter((m) => m.type === "td");

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <div className="max-w-6xl mx-auto px-4 py-8">

        <div className="mb-8">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                📋 Bulletin 2ème Année
              </h1>
              <p className="text-slate-500 text-sm mt-1">Faculté de Médecine Dentaire — Calculateur de notes</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-400 inline-block" />
                <span className="text-slate-500">TP : (TP×2 + moy_ctrl) / 3</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
                <span className="text-slate-500">TD : (TD + moy_ctrl) / 2</span>
              </div>
              <button
                onClick={handleReset}
                className="ml-2 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors text-xs font-medium"
              >
                Réinitialiser
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                <h2 className="font-semibold text-slate-700">Modules avec TP</h2>
                <span className="text-xs text-slate-400">(Travaux Pratiques)</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                {tpModules.map((mod) => (
                  <ModuleCard
                    key={mod.id}
                    mod={mod}
                    grades={grades[mod.id]}
                    onChange={(field, value) => handleChange(mod.id, field, value)}
                  />
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <h2 className="font-semibold text-slate-700">Modules avec TD</h2>
                <span className="text-xs text-slate-400">(Travaux Dirigés)</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                {tdModules.map((mod) => (
                  <ModuleCard
                    key={mod.id}
                    mod={mod}
                    grades={grades[mod.id]}
                    onChange={(field, value) => handleChange(mod.id, field, value)}
                  />
                ))}
              </div>
            </div>
          </div>

          <SummaryPanel modules={MODULES} grades={grades} />
        </div>
      </div>
    </div>
  );
}
