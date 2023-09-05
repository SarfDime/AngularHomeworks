import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { of } from "rxjs"
import { catchError, map, mergeMap } from "rxjs/operators"
import { PeopleApiService } from "../../services/people-api.service"

import * as PeopleActions from "./people.actions"

@Injectable()
export class PeopleEffects {
    constructor(
        private actions$: Actions,
        private peopleApiService: PeopleApiService
    ) { }

    loadPeople$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PeopleActions.loadPeople),
            mergeMap((action) =>
                this.peopleApiService.getPeople(action.page).pipe(
                    map((people) => PeopleActions.loadPeopleSuccess({ people })),
                    catchError((error) => of(PeopleActions.loadPeopleFailure({ error })))
                )
            )
        )
    )
}
