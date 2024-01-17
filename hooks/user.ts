import { create } from "zustand";

type User = {
  id: string;
  phone: string;
};

type Store = {
  user: User | null;
  setUser: (user: User) => void;
};

export const useUserStore = create<Store>()((set) => {
  return {
    user: null,
    setUser: (user) => set(() => ({ user })),
  };
});
