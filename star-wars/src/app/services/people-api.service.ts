import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { People } from '../modules/people/people.interfaces.ts'

@Injectable({
    providedIn: 'root',
})

export class PeopleApiService {
    private readonly baseUrl = 'https://swapi.dev/api/people/?page='
    private readonly searchUrl = 'https://swapi.dev/api/people/?search='

    constructor(private readonly http: HttpClient) { }

    getPeople = (page: number): Observable<People> => this.http.get<People>(`${this.baseUrl}${page || '1'}`)

    getPerson = (name: string): Observable<People> => this.http.get<People>(`${this.searchUrl}${name}`)
}
