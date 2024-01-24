import axios from "axios";
import { create } from "zustand";

type User = {
  id: string | null;
  phone: string | null;
};

type Store = {
  user: User | null;
  attempts: any;
  setUser: (token: string) => void;
  removeUser: () => void;
  count: number;
  max: number;
  inc: () => void;
};

export const useUserStore = create<Store>()((set) => {
  return {
    user: null,
    attempts: null,
    removeUser: () => set({ user: null }),
    setUser: async (token) => {
      const response = await axios.post("/api/validate", { token });
      const { data } = response;
      set({
        user: data.user,
        attempts: data.attempts,
        count: data.attempts?.count || 0,
        max: data.attempts?.max || 0,
      });
    },
    count: 0,
    max: 0,
    inc: () => set((state) => ({ count: state.count + 1 })),
  };
});
