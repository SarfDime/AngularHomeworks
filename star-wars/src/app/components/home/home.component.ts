import { Component, OnInit } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { People } from 'src/app/modules/people/people.interfaces.ts'
import { Planets } from 'src/app/modules/planets/planets.interfaces.ts'
import { AppState } from 'src/app/store/app.state'
import { loadPeople } from 'src/app/store/people/people.actions'
import { selectPeopleData, selectPeopleLoading } from 'src/app/store/people/people.selectors'
import { loadPlanets } from 'src/app/store/planets/planets.actions'
import { selectPlanetsLoading, selectPlanetsData } from 'src/app/store/planets/planets.selectors'

import { Router } from '@angular/router'
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLoadingPeople: boolean = true
  currentPeople: People | undefined

  isLoadingPlanets: boolean = true
  currentPlanets: Planets | undefined

  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit() {
    this.store.pipe(select(selectPlanetsData)).subscribe(e => {
      this.currentPlanets = e
    })

    this.store.pipe(select(selectPeopleData)).subscribe(e => {
      this.currentPeople = e
    })

    this.store.pipe(select(selectPeopleLoading)).subscribe(e => {
      this.isLoadingPeople = e
    })

    this.store.pipe(select(selectPlanetsLoading)).subscribe(e => {
      this.isLoadingPlanets = e
    })

    if (!this.isLoadingPeople && this.currentPeople!.count === 0) {
      this.store.dispatch(loadPeople({ page: 0 }))
    }

    if (!this.isLoadingPlanets && this.currentPlanets!.count === 0) {
      this.store.dispatch(loadPlanets({ page: 0 }))
    }
  }

  onSubmitPersonForm(personForm: NgForm) {
    const inputValue = personForm.value.inputValue
    if (inputValue) {
      this.router.navigate(['person', inputValue.toLowerCase()])
    }
  }

  onSubmitPlanetForm(planetForm: NgForm) {
    const inputValue = planetForm.value.inputValue
    if (inputValue) {
      this.router.navigate(['planet', inputValue.toLowerCase()])
    }
  }
}
