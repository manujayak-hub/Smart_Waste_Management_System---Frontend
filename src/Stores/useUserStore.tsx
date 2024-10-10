// src/store/userStore.ts
import { create } from 'zustand';

interface UserState {
  userId: string | null;
  token: string | null;
  setUser: (id: string, token: string) => void;
  clearUser: () => void;
}

const useUserStore = create<UserState>((set) => ({
  userId: null,
  token: null,
  setUser: (id: string, token: string) =>
    set({ userId: id, token: token }),
  clearUser: () => set({ userId: null, token: null }),
}));

export default useUserStore;
