// import { create } from "zustand";
// import { test } from "@/components/quiz/test";

// type Store = {
//   maxQuestionsNumber: number;
//   index: number;
//   value: {
//     question: string;
//     variants: string[];
//     answer: number;
//   };
//   nextQuestion: () => void;
//   clearState: () => void;
// };

// export const useQuizStore = create<Store>()((set) => {
//   const defaultIndex = 0;
//   return {
//     index: defaultIndex,
//     value: test[defaultIndex],
//     maxQuestionsNumber: test.length,
//     nextQuestion: () =>
//       set((state) => {
//         if (state.index === state.maxQuestionsNumber - 1) return state;
//         return {
//           index: state.index + 1,
//           value: test[state.index + 1],
//         };
//       }),
//     clearState: () => set({ index: defaultIndex, value: test[defaultIndex] }),
//   };
// });
