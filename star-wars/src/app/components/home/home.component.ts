import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Store, select } from '@ngrx/store'
import { People } from 'src/app/modules/people/people.interfaces.ts'
import { Planets } from 'src/app/modules/planets/planets.interfaces.ts'
import { AppState } from 'src/app/store/app.state'
import { loadPeople } from 'src/app/store/people/people.actions'
import { selectPeopleData, selectPeopleError, selectPeopleLoading } from 'src/app/store/people/people.selectors'
import { loadPlanets } from 'src/app/store/planets/planets.actions'
import { selectPlanetsLoading, selectPlanetsError, selectPlanetsData } from 'src/app/store/planets/planets.selectors'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLoadingPeople: boolean = true
  isErrorPeople: any = null
  currentPeople: People | undefined

  isLoadingPlanets: boolean = true
  isErrorPlanets: any = null
  currentPlanets: Planets | undefined

  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit() {
    this.store.pipe(select(selectPlanetsData)).subscribe(e => {
      if (!e) {
        this.router.navigate(['not-found'])
      } else {
        this.currentPlanets = e
      }
    })

    this.store.pipe(select(selectPeopleData)).subscribe(e => {
      if (!e) {
        this.router.navigate(['not-found'])
      } else {
        this.currentPeople = e
      }
    })

    this.store.pipe(select(selectPeopleLoading)).subscribe(e => {
      this.isLoadingPeople = e
    })

    this.store.pipe(select(selectPeopleError)).subscribe(e => {
      this.isErrorPeople = e
    })

    this.store.pipe(select(selectPlanetsLoading)).subscribe(e => {
      this.isLoadingPlanets = e
    })

    this.store.pipe(select(selectPlanetsError)).subscribe(e => {
      this.isErrorPlanets = e
    })

    if (!this.isLoadingPeople && this.currentPeople!.count === 0) {
      this.store.dispatch(loadPeople({page: 0}))
    }
    
    if (!this.isLoadingPlanets && this.currentPlanets!.count === 0) {
      this.store.dispatch(loadPlanets())
    }
  }
}
