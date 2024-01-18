import { create } from "zustand";

type User = {
  id: string | null;
  phone: string | null;
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
