import { create } from 'zustand'

export const statisticInitialState = {
  susceptible: 50,
  exposed: 0,
  infected: 0,
  recovered: 0,
  dead: 0,
};

export const useStatisticStore = create((set) => ({
  statistic: statisticInitialState,
  updateStatistic: (newStatistic) => set({ statistic: newStatistic }),
}));
