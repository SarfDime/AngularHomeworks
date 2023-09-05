import { createAction, props } from '@ngrx/store'
import { People } from '../../modules/people/people.interfaces.ts'

export const loadPeople = createAction('[People] Load People', props<{ page: number }>());
export const loadPeopleSuccess = createAction('[People] Load People Success', props<{ people: People }>())
export const loadPeopleFailure = createAction('[People] Load People Failure', props<{ error: any }>())


