import { createReducer, on } from '@ngrx/store'
import { People } from '../../modules/people/people.interfaces.ts'
import { loadPerson, loadPersonFailure, loadPersonSuccess } from './person.actions'

export interface PersonState {
  data: People
  loading: boolean
  error: any
}

const initialState: PersonState = {
  data: {
    count: 0,
    next: null,
    previous: null,
    results: [],
  },
  loading: false,
  error: null,
}

export const personReducer = createReducer(
  initialState,
  on(loadPerson, (state) => ({ ...state, loading: true })),
  on(loadPersonSuccess, (state, { person }) => ({ ...state, data: person, loading: false })),
  on(loadPersonFailure, (state, { error }) => ({ ...state, error, loading: false }))
)
