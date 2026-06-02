import type { Module } from "./types";

export const MODULES: Module[] = [
  // TP modules: (TP*2 + (C1+C2)/2) / 3
  { id: "prothese",  name: "Prothèse",     coef: 5, type: "tp" },
  { id: "oce",       name: "OC/E",         coef: 5, type: "tp" },
  { id: "anadent",   name: "Ana-Dent",     coef: 3, type: "tp" },

  // TD modules: (TD + (C1+C2)/2) / 2
  { id: "paro",      name: "Paro",         coef: 3, type: "td" },
  { id: "patho",     name: "Patho",        coef: 3, type: "td" },

  // 3 contrôles only: (C1+C2+C3) / 3
  { id: "biomater",  name: "Biomatériaux", coef: 2, type: "ctrl3" },

  // 2 contrôles only: (C1+C2) / 2
  { id: "odf",       name: "ODF",          coef: 3, type: "ctrl2" },
  { id: "anato",     name: "Anato-Hum",    coef: 4, type: "ctrl2" },
  { id: "microbio",  name: "Micro-Bio",    coef: 2, type: "ctrl2" },
  { id: "info",      name: "Info",         coef: 1, type: "tp" },

  // 1 contrôle only: C1
  { id: "histo",     name: "Histo",        coef: 2, type: "ctrl1" },
  { id: "physio",    name: "Physio",       coef: 1, type: "ctrl1" },
  { id: "immuno",    name: "Immuno",       coef: 1, type: "ctrl1" },
  { id: "hygiene",   name: "Hygiène",      coef: 1, type: "ctrl1" },
  { id: "anglais",   name: "Anglais",      coef: 1, type: "ctrl1" },
];

export const TOTAL_COEF = MODULES.reduce((s, m) => s + m.coef, 0);
