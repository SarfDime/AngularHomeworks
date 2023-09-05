import { createAction, props } from '@ngrx/store'
import { People } from '../../modules/people/people.interfaces.ts'

export const loadPeople = createAction('[People] Load People')
export const loadPeopleSuccess = createAction('[People] Load People Success', props<{ people: People }>())
export const loadPeopleFailure = createAction('[People] Load People Failure', props<{ error: Error }>())


