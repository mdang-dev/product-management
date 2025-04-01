import { create } from "zustand";
import { User } from "../models"

interface UserState {
  user?: User,
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: undefined,
  setUser: (user: User) => set({ user: user }),
  clearUser: () => set({ user: undefined }),
}));