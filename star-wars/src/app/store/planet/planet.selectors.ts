import { AppState } from '../app.state';

export const selectPlanetData = (state: AppState) => state.planet.data
export const selectPlanetLoading = (state: AppState) => state.planet.loading
export const selectPlanetError = (state: AppState) => state.planet.error