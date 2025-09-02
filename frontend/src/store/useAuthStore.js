import { create } from "zustand";
import axios from "axios";

export const useAuthStore = create((set) => ({
  user: null,
  loading: false,
  fetchUser: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/api/current_user");
      set({ user: res.data.user, loading: false });
    } catch (error) {
      set({ user: null, loading: false });
    }
  },
  logout: async () => {
    await axios.post("/api/logout");
    set({ user: null });
  },
}));
