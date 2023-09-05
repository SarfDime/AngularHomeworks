import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Planets } from '../modules/planets/planets.interfaces.ts'

@Injectable({
    providedIn: 'root',
})

export class PlanetsApiService {
    private readonly baseUrl = 'https://swapi.dev/api/planets'

    constructor(private readonly http: HttpClient) { }

    getPlanets = (): Observable<Planets> => this.http.get<Planets>(`${this.baseUrl}/`)
}
