import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { People } from '../modules/people/people.interfaces.ts'

@Injectable({
    providedIn: 'root',
})

export class PeopleApiService {
    private readonly baseUrl = 'https://swapi.dev/api/people/?page='

    constructor(private readonly http: HttpClient) { }

    getPeople = (page: number): Observable<People> => this.http.get<People>(`${this.baseUrl}${page || '1'}`)
}
