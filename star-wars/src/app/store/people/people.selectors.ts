import { AppState } from '../app.state';

export const selectPeopleData = (state: AppState) => state.people.data
export const selectPeopleLoading = (state: AppState) => state.people.loading
export const selectPeopleError = (state: AppState) => state.people.error