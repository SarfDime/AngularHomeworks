import { createReducer, on } from '@ngrx/store'
import { Planets } from 'src/app/modules/planets/planets.interfaces.ts'
import { loadPlanets, loadPlanetsSuccess, loadPlanetsFailure } from './planets.actions'


export interface PlanetsState {
  data: Planets;
  loading: boolean;
  error: any;
}

const initialState: PlanetsState = {
  data: {
    count: 0,
    next: '',
    previous: null,
    results: [],
  },
  loading: false,
  error: null,
}

export const planetsReducer = createReducer(
  initialState,
  on(loadPlanets, (state) => ({ ...state, loading: true })),
  on(loadPlanetsSuccess, (state, { planets }) => ({ ...state, data: planets, loading: false })),
  on(loadPlanetsFailure, (state, { error }) => ({ ...state, error, loading: false }))
)
