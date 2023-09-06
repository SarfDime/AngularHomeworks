import { createAction, props } from '@ngrx/store'
import { Planets } from 'src/app/modules/planets/planets.interfaces.ts.js'

export const loadPlanet = createAction('[Planet] Load Planet', props<{ name: string }>())
export const loadPlanetSuccess = createAction('[Planet] Load Planet Success', props<{ planet: Planets }>())
export const loadPlanetFailure = createAction('[Planet] Load Planet Failure', props<{ error: any }>())

