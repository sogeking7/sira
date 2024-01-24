import axios from "axios";
import { create } from "zustand";

type User = {
  id: string | null;
  phone: string | null;
};

type Store = {
  user: User | null;
  setUser: (token: string) => void;
  removeUser: () => void;
}  

export const useUserStore = create<Store>()((set) => {
  return {
    user: null,
    removeUser: () => set({ user: null }),
    setUser: async (token) => {
      const response = await axios.post('/api/validate', { token });
      set({
        user: response.data,
      });
    },
  };
});
