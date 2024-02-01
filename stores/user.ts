import { User } from "@/types";
import { create } from "zustand";

type Store = {
  user: User | null;
  count: number;
  foo: boolean,
  setFoo: (foo: boolean) => void;
  initUser: (user: User) => void;
  incCount: () => void;
  setCount: (count: number) => void;
};

export const useUserStore = create<Store>()((set) => {
  return {
    user: null,
    count: 0,
    foo: false,
    setFoo: (foo) => set({ foo }),
    initUser: (user) => set({ user }),
    setCount: (count) => set({ count }),
    incCount: () => set((state) => ({ count: state.count + 1 })),
  };
});
