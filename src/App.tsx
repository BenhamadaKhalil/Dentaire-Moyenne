import { useState } from "react";
import type { Grades, GradesMap } from "./types";
import { MODULES, TOTAL_COEF } from "./modules";
import { typeConfig } from "./utils";
import ModuleCard from "./components/ModuleCard";
import SummaryPanel from "./components/SummaryPanel";

type ModuleType = "tp" | "td" | "ctrl3" | "ctrl2" | "ctrl1";

const GROUPS: { type: ModuleType; label: string; sub: string }[] = [
  {
    type: "tp",
    label: "Travaux Pratiques (TP)",
    sub: "formule : (TP×2 + moy_ctrl) / 3",
  },
  {
    type: "td",
    label: "Travaux Dirigés (TD)",
    sub: "formule : (TD + moy_ctrl) / 2",
  },
  { type: "ctrl3", label: "3 Contrôles", sub: "formule : (C1+C2+C3) / 3" },
  {
    type: "ctrl2",
    label: "2 Contrôles uniquement",
    sub: "formule : (C1+C2) / 2",
  },
  { type: "ctrl1", label: "1 Contrôle uniquement", sub: "note directe" },
];

function emptyGrades(): Grades {
  return { c1: "", c2: "", c3: "", practical: "" };
}

function initGrades(): GradesMap {
  return Object.fromEntries(MODULES.map((m) => [m.id, emptyGrades()]));
}

export default function App() {
  const [grades, setGrades] = useState<GradesMap>(initGrades);

  const handleChange = (id: string, field: keyof Grades, value: string) => {
    setGrades((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  const handleReset = () => setGrades(initGrades());

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              🦷 Bulletin 2ème Année
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Faculté de Médecine Dentaire — Calculateur de notes pondérées
            </p>
          </div>
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-all text-sm font-medium shadow-sm"
          >
            🔄 Réinitialiser
          </button>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 items-start">
          {/* Module groups */}
          <div className="space-y-8">
            {GROUPS.map(({ type, label, sub }) => {
              const mods = MODULES.filter((m) => m.type === type);
              if (mods.length === 0) return null;
              const cfg = typeConfig(type);
              return (
                <section key={type}>
                  <div className="flex items-center gap-2.5 mb-4">
                    <span className={`w-2.5 h-2.5 rounded-full ${cfg.dot}`} />
                    <h2 className="font-bold text-slate-700 text-sm">
                      {label}
                    </h2>
                    <span className="text-xs text-slate-400 font-mono">
                      {sub}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                    {mods.map((mod) => (
                      <ModuleCard
                        key={mod.id}
                        mod={mod}
                        grades={grades[mod.id]}
                        onChange={(field, value) =>
                          handleChange(mod.id, field, value)
                        }
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>

          {/* Summary sidebar */}
          <SummaryPanel
            modules={MODULES}
            grades={grades}
            totalCoef={TOTAL_COEF}
          />
        </div>
      </div>
    </div>
  );
}
