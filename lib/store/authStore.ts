import { User } from "@/types/note";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User) => void;
  clearIsAuthenticated: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      setUser: (user: User) => set(() => ({ user, isAuthenticated: true })),
      clearIsAuthenticated: () =>
        set(() => ({ user: null, isAuthenticated: false })),
    }),
    {
      name: "User",
      partialize: (state) => ({ user: state.user }),
    },
  ),
);
