import { create } from "zustand";

type User = {
  id: string | null;
  phone: string | null;
};

type Store = {
  user: User | null;
  setUser: (data: User) => void;
}  

export const useUserStore = create<Store>()((set) => {
  return {
    user: null,
    setUser: (data) => set(() => ({user: data})),
  };
});
