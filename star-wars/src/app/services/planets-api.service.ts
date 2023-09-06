import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Planets } from '../modules/planets/planets.interfaces.ts'

@Injectable({
    providedIn: 'root',
})

export class PlanetsApiService {
    private readonly baseUrl = 'https://swapi.dev/api/planets/?page='
    private readonly searchUrl = 'https://swapi.dev/api/planets/?search='

    constructor(private readonly http: HttpClient) { }

    getPlanets = (page: number): Observable<Planets> => this.http.get<Planets>(`${this.baseUrl}${page || '1'}`)

    getPlanet = (name: string): Observable<Planets> => this.http.get<Planets>(`${this.searchUrl}${name}`)
}
