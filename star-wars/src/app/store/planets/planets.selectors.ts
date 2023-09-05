import { AppState } from '../app.state';

export const selectPlanetsData = (state: AppState) => state.planets.data
export const selectPlanetsLoading = (state: AppState) => state.planets.loading
export const selectPlanetsError = (state: AppState) => state.planets.error