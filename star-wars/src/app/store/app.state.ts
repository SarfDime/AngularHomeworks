import { ActionReducerMap } from '@ngrx/store'
import { PlanetsState, planetsReducer } from './planets/planets.reducer'
import { PeopleState, peopleReducer } from './people/people.reducer'

export interface AppState {
    people: PeopleState,
    planets: PlanetsState
}

export const appReducer: ActionReducerMap<AppState> = {
    people: peopleReducer,
    planets: planetsReducer,
}