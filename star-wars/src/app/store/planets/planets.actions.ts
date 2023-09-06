import { createAction, props } from '@ngrx/store'
import { Planets } from '../../modules/planets/planets.interfaces.ts'

export const loadPlanets = createAction('[Planets] Load Planets', props<{ page: number }>())
export const loadPlanetsSuccess = createAction('[Planets] Load Planets Success', props<{ planets: Planets }>())
export const loadPlanetsFailure = createAction('[Planets] Load Planets Failure', props<{ error: any }>())
