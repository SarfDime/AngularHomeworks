import { createReducer, on } from '@ngrx/store'
import { loadPlanet, loadPlanetFailure, loadPlanetSuccess } from './planet.actions'
import { Planets } from 'src/app/modules/planets/planets.interfaces.ts.js'

export interface PlanetState {
  data: Planets
  loading: boolean
  error: any
}

const initialState: PlanetState = {
  data: {
    count: 0,
    next: null,
    previous: null,
    results: [],
  },
  loading: false,
  error: null,
}

export const planetReducer = createReducer(
  initialState,
  on(loadPlanet, (state) => ({ ...state, loading: true })),
  on(loadPlanetSuccess, (state, { planet }) => ({ ...state, data: planet, loading: false })),
  on(loadPlanetFailure, (state, { error }) => ({ ...state, error, loading: false }))
)
