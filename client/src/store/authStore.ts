import { User } from "@/lib/types";
import { create } from "zustand";

type Store = {
  authenticated: boolean;
  user: User |object | null;
  setAuthenticated: (value: boolean) => void;
  setUser: (user: object | null) => void;
};

const useStore = create<Store>((set) => ({
  authenticated: false,
  user: null,
  setAuthenticated: (value) => set(() => ({ authenticated: value })),
  setUser: (user) => set(() => ({ user })),
}));

export default useStore;
