import type { Module, Grades, ModuleType } from "./types";

export function calcNote(mod: Module, g: Grades): number | null {
  const v1 = parseFloat(g.c1);
  const v2 = parseFloat(g.c2);
  const v3 = parseFloat(g.c3);
  const vp = parseFloat(g.practical);

  switch (mod.type) {
    case "tp": {
      if (isNaN(v1) || isNaN(v2) || isNaN(vp)) return null;
      return (vp * 2 + (v1 + v2) / 2) / 3;
    }
    case "td": {
      if (isNaN(v1) || isNaN(v2) || isNaN(vp)) return null;
      return (vp + (v1 + v2) / 2) / 2;
    }
    case "ctrl3": {
      if (isNaN(v1) || isNaN(v2) || isNaN(v3)) return null;
      return (v1 + v2 + v3) / 3;
    }
    case "ctrl2": {
      if (isNaN(v1) || isNaN(v2)) return null;
      return (v1 + v2) / 2;
    }
    case "ctrl1": {
      if (isNaN(v1)) return null;
      return v1;
    }
  }
}

export function formulaLabel(mod: Module, g: Grades): string {
  const v1 = parseFloat(g.c1);
  const v2 = parseFloat(g.c2);
  const v3 = parseFloat(g.c3);
  const vp = parseFloat(g.practical);
  const f = (n: number) => n.toFixed(2);

  switch (mod.type) {
    case "tp":
      return `(${f(vp)}×2 + (${f(v1)}+${f(v2)})/2) / 3`;
    case "td":
      return `(${f(vp)} + (${f(v1)}+${f(v2)})/2) / 2`;
    case "ctrl3":
      return `(${f(v1)} + ${f(v2)} + ${f(v3)}) / 3`;
    case "ctrl2":
      return `(${f(v1)} + ${f(v2)}) / 2`;
    case "ctrl1":
      return `Contrôle unique`;
  }
}

export function isValidGrade(val: string): boolean {
  if (val === "") return true;
  const n = parseFloat(val);
  return !isNaN(n) && n >= 0 && n <= 20;
}

export function scoreColor(note: number): string {
  if (note >= 16) return "bg-emerald-100 text-emerald-800";
  if (note >= 12) return "bg-sky-100 text-sky-800";
  if (note >= 10) return "bg-amber-100 text-amber-800";
  return "bg-red-100 text-red-700";
}

export function typeConfig(type: ModuleType) {
  switch (type) {
    case "tp":
      return {
        cardBg: "bg-sky-50",
        border: "border-sky-200",
        badge: "bg-sky-100 text-sky-700",
        dot: "bg-sky-400",
        label: "TP",
        labelColor: "text-sky-600",
      };
    case "td":
      return {
        cardBg: "bg-emerald-50",
        border: "border-emerald-200",
        badge: "bg-emerald-100 text-emerald-700",
        dot: "bg-emerald-400",
        label: "TD",
        labelColor: "text-emerald-600",
      };
    case "ctrl3":
      return {
        cardBg: "bg-violet-50",
        border: "border-violet-200",
        badge: "bg-violet-100 text-violet-700",
        dot: "bg-violet-400",
        label: "3 Ctrl",
        labelColor: "text-violet-600",
      };
    case "ctrl2":
      return {
        cardBg: "bg-slate-50",
        border: "border-slate-200",
        badge: "bg-slate-100 text-slate-600",
        dot: "bg-slate-400",
        label: "2 Ctrl",
        labelColor: "text-slate-500",
      };
    case "ctrl1":
      return {
        cardBg: "bg-orange-50",
        border: "border-orange-200",
        badge: "bg-orange-100 text-orange-700",
        dot: "bg-orange-400",
        label: "1 Ctrl",
        labelColor: "text-orange-600",
      };
  }
}
