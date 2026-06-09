import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ChapterId = "problem" | "discovery" | "prioritization" | "delivery" | "results";

export interface SimState {
  /** chapterId -> chosen option index */
  choices: Record<string, number>;
  unlocked: boolean;
  scenarioId: string | null;
  setScenario: (id: string) => void;
  setChoice: (chapter: string, optionIndex: number) => void;
  unlock: () => void;
  reset: () => void;
}

export const useSimStore = create<SimState>()(
  persist(
    (set) => ({
      choices: {},
      unlocked: false,
      scenarioId: null,
      setScenario: (id) => set({ scenarioId: id, choices: {} }),
      setChoice: (chapter, optionIndex) =>
        set((s) => ({ choices: { ...s.choices, [chapter]: optionIndex } })),
      unlock: () => set({ unlocked: true }),
      reset: () => set({ choices: {}, unlocked: false, scenarioId: null }),
    }),
    { name: "pmexe-sim" },
  ),
);