import { create } from "zustand";

type Store = {
  count: number,
  currentQuestionPrizeStatus: 'gifted' | 'not-gifted' | 'pending',
  inc: () => void;
  setPrizeStatus: (status: 'gifted' | 'not-gifted' | 'pending') => void;
};

export const usePrizeStore = create<Store>()((set) => {
  return {  
    count: 0,
    currentQuestionPrizeStatus: 'pending',
    setPrizeStatus: (status: 'gifted' | 'not-gifted' | 'pending') => set((state ) => ({ currentQuestionPrizeStatus: status })),
    inc: () => set((state ) => ({ count: state.count + 1 })),
  };
});
