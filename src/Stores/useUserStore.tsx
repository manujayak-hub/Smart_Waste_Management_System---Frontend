import { create } from 'zustand';

interface UserState {
  userId: string | null;
  token: string | null;
  setUser: (id: string, token: string) => void;
  clearUser: () => void;
}

// Zustand store
const useUserStore = create<UserState>((set) => ({
  userId: null,  // Set as `null` initially for clarity
  token: null,   // Same here, makes it easier to check if the user is logged in

  // Function to set userId and token
  setUser: (id, token) => {
    console.log('Setting userId:', id, 'Setting token:', token);
    set(() => ({
      userId: id,
      token: token,
    }));
  },

  // Function to clear userId and token
  clearUser: () => {
    console.log('Clearing user data');
    set(() => ({
      userId: null,
      token: null,
    }));
  },
}));

export default useUserStore;
