import { createAction, props } from '@ngrx/store'
import { People } from '../../modules/people/people.interfaces.ts'

export const loadPerson = createAction('[Person] Load Person', props<{ name: string }>())
export const loadPersonSuccess = createAction('[Person] Load Person Success', props<{ person: People }>())
export const loadPersonFailure = createAction('[Person] Load Person Failure', props<{ error: any }>())

