import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, map, mergeMap } from 'rxjs/operators'

import * as PlanetsActions from './planets.actions'
import { PlanetsApiService } from 'src/app/services/planets-api.service'

@Injectable()
export class PlanetsEffects {
    constructor(
        private actions$: Actions,
        private planetsService: PlanetsApiService
    ) { }

    loadPlanets$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PlanetsActions.loadPlanets),
            mergeMap((action) =>
                this.planetsService.getPlanets(action.page).pipe(
                    map((planets) => PlanetsActions.loadPlanetsSuccess({ planets })),
                    catchError((error) => of(PlanetsActions.loadPlanetsFailure({ error })))
                )
            )
        )
    );
}
