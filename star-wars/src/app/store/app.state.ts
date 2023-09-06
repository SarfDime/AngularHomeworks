import { ActionReducerMap } from '@ngrx/store'
import { PlanetsState, planetsReducer } from './planets/planets.reducer'
import { PeopleState, peopleReducer } from './people/people.reducer'
import { PersonState, personReducer } from './person/person.reducer'
import { PlanetState, planetReducer } from './planet/planet.reducer'

export interface AppState {
    people: PeopleState,
    person: PersonState,
    planets: PlanetsState,
    planet: PlanetState
}

export const appReducer: ActionReducerMap<AppState> = {
    people: peopleReducer,
    person: personReducer,
    planets: planetsReducer,
    planet: planetReducer
}