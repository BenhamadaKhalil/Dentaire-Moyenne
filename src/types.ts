export type ModuleType =
  | "tp"          // 2 controles + TP note
  | "td"          // 2 controles + TD note
  | "ctrl2"       // 2 controles only
  | "ctrl1"       // 1 controle only
  | "ctrl3";      // 3 controles only (Biomatériaux)

export interface Module {
  id: string;
  name: string;
  coef: number;
  type: ModuleType;
}

export interface Grades {
  c1: string;
  c2: string;
  c3: string;       // only Biomatériaux
  practical: string; // TD or TP value
}

export type GradesMap = Record<string, Grades>;
