import { AppState } from '../app.state'

export const selectPersonData = (state: AppState) => state.person.data
export const selectPersonLoading = (state: AppState) => state.person.loading
export const selectPersonError = (state: AppState) => state.person.error