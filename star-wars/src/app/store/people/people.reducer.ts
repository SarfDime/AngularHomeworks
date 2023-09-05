import { createReducer, on } from '@ngrx/store';
import { loadPeople, loadPeopleSuccess, loadPeopleFailure } from './people.actions'
import { People } from '../../modules/people/people.interfaces.ts'

export interface PeopleState {
  data: People
  loading: boolean
  error: any
}

const initialState: PeopleState = {
  data: {
    count: 0,
    next: '',
    previous: null,
    results: [],
  },
  loading: false,
  error: null,
}

export const peopleReducer = createReducer(
  initialState,
  on(loadPeople, (state) => ({ ...state, loading: true })),
  on(loadPeopleSuccess, (state, { people }) => ({ ...state, data: people, loading: false })),
  on(loadPeopleFailure, (state, { error }) => ({ ...state, error, loading: false }))
)
