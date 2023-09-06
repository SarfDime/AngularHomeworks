import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { of } from "rxjs"
import { catchError, map, mergeMap } from "rxjs/operators"
import { PeopleApiService } from "../../services/people-api.service"

import * as PersonActions from "./person.actions"

@Injectable()
export class PersonEffects {
    constructor(
        private actions$: Actions,
        private peopleApiService: PeopleApiService
    ) { }

    loadPerson$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PersonActions.loadPerson),
            mergeMap((action) =>
                this.peopleApiService.getPerson(action.name).pipe(
                    map((person) => PersonActions.loadPersonSuccess({ person })),
                    catchError((error) => of(PersonActions.loadPersonFailure({ error })))
                )
            )
        )
    )
}
