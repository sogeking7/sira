import { create } from "zustand";

type Store = {
  initAttempt: (data: any) => void;
};

export const useAttemptStore = create<Store>()((set) => {
  return {
    initAttempt: (data) =>
      set((state) => {
        return {};
      }),
  };
});
