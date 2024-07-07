import { create } from "zustand";

const useAdditionalDataStore = create((set) => ({
  additionalData: [11, 221, 22],
  setAdditionalData: (data) => set({ additionalData: data }),
  clearAdditionalData: () => set({ additionalData: [] }),
}));

export default useAdditionalDataStore;
