import { create } from 'zustand'

const countryInitialState = '';

export const useCountryStore = create((set) => ({
  country: countryInitialState,
  selectCountry: (newCountryId: string) => set({ country: newCountryId }),
}));
