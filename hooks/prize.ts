import { create } from "zustand";

type Store = {
  count: number;
  max: number;
  inc: () => void;
  set: (count: number) => void;
  setMax: (max: number) => void;
  removePrize: () => void;
};

export const usePrizeStore = create<Store>()((set) => {
  return {
    count: 0,
    max: 0,
    removePrize: () => set({ count: 0, max: 0 }),
    inc: () => set((state) => ({ count: state.count + 1 })),
    set: (count) => set(() => ({ count })),
    setMax: (max) => set(() => ({ max })),
  };
});
