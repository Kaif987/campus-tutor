import { createStore } from "zustand/vanilla";

const navbarStore = createStore((set) => ({
  selectedMenuItem: "",

  setSelectedMenuItem: (menuItemName) => {
    set({ selectedMenuItem: menuItemName });
  },
}));

export default navbarStore;
