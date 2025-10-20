import { User } from "@/lib/types";
import { create } from "zustand";

type Store = {
  authenticated: boolean;
  user: User | object | null;
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


// 1️⃣ What is Zustand?

// Zustand is a small, fast, and scalable state management library for React.
// It's simpler than Redux.
// No boilerplate like actions/reducers.
// Uses hooks to access and update state.
// Ideal for global state like authentication, cart, or theme.
// Think of it as a central store for your app’s data, but super lightweight and modern.


// 2️⃣ Core Concepts

// A store in Zustand is just:
// A state object (the data you want to share globally).
// Functions that update that state.
