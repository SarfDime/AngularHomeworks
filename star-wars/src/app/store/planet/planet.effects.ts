import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { of } from "rxjs"
import { catchError, map, mergeMap } from "rxjs/operators"

import * as PlanetActions from "./planet.actions"
import { PlanetsApiService } from "src/app/services/planets-api.service"

@Injectable()
export class PlanetEffects {
    constructor(
        private actions$: Actions,
        private planetApiService: PlanetsApiService
    ) { }

    loadPlanet$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PlanetActions.loadPlanet),
            mergeMap((action) =>
                this.planetApiService.getPlanet(action.name).pipe(
                    map((planet) => PlanetActions.loadPlanetSuccess({ planet })),
                    catchError((error) => of(PlanetActions.loadPlanetFailure({ error })))
                )
            )
        )
    )
}
