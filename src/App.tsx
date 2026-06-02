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

const GITHUB_URL = "https://github.com/BenhamadaKhalil/Dentaire-Moyenne";
const YOUTUBE_URL = "https://youtube.com/@fivewideweb?si=FME9G_r8LbHvPCgR";

function emptyGrades(): Grades {
  return { c1: "", c2: "", c3: "", practical: "" };
}

function initGrades(): GradesMap {
  return Object.fromEntries(MODULES.map((m) => [m.id, emptyGrades()]));
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
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
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <div className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              🦷 Bulletin 2ème Année
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Faculté de Médecine Dentaire — Calculateur de moyenne générale
            </p>
          </div>

          {/* Header actions */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* YouTube */}
            <a
              href={YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              id="yt-header-link"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 hover:border-red-300 transition-all text-sm font-medium shadow-sm"
            >
              <YouTubeIcon />
              <span>FiveWideWeb</span>
            </a>

            {/* GitHub Star */}
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              id="github-star-header"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100 hover:border-amber-300 transition-all text-sm font-medium shadow-sm"
            >
              <StarIcon />
              <span>Star on GitHub</span>
            </a>

            {/* Reset */}
            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-all text-sm font-medium shadow-sm"
            >
              🔄 Réinitialiser
            </button>
          </div>
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

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white mt-8">
        <div className="max-w-6xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-xs text-center sm:text-left">
            Fait avec ❤️ pour les étudiants en médecine dentaire d'Algérie
          </p>
          <div className="flex items-center gap-3">
            <a
              href={YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              id="yt-footer-link"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 hover:border-red-300 transition-all text-xs font-semibold"
            >
              <YouTubeIcon />
              @fivewideweb
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              id="github-star-footer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-amber-50 hover:text-amber-700 hover:border-amber-200 transition-all text-xs font-semibold"
            >
              <GitHubIcon />
              ⭐ Star the repo
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
