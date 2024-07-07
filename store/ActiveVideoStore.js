import { create } from "zustand";

const useActiveVideoStore = create((set) => ({
  videoLink: "",
  setVideoLink: (link) => set({ videoLink: link }),
  clearVideoLink: () => set({ videoLink: "" }),
}));

export default useActiveVideoStore;
