import { User } from "@/types";
import { create } from "zustand";

type Store = {
  user: User | null;
  count: number;
  initUser: (user: User) => void;
  removeUser: () => void;
  incCount: () => void;
  setCount: (count: number) => void;
};

export const useUserStore = create<Store>()((set) => {
  return {
    user: null,
    count: 0,
    initUser: (user) => set({ user }),
    removeUser: () => set({ user: null }),
    setCount: (count) => set({ count }),
    incCount: () => set((state) => ({ count: state.count + 1 })),
  };
});
