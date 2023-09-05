import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Store, select } from '@ngrx/store'
import { Planet } from 'src/app/modules/planets/planets.interfaces.ts'
import { AppState } from 'src/app/store/app.state'
import { loadPlanets } from 'src/app/store/planets/planets.actions'
import { selectPlanetsData, selectPlanetsError, selectPlanetsLoading } from 'src/app/store/planets/planets.selectors'

@Component({
  selector: 'app-planets-list',
  templateUrl: './planets-list.component.html',
  styleUrls: ['./planets-list.component.scss']
})

export class PlanetsListComponent implements OnInit {
  isLoading: boolean = true
  isError: any = null
  currentPlanets: Planet[] | undefined

  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit() {
    this.store.pipe(select(selectPlanetsData)).subscribe(e => {
      this.currentPlanets = e.results
    })

    this.store.pipe(select(selectPlanetsLoading)).subscribe(e => {
      this.isLoading = e
    })

    this.store.pipe(select(selectPlanetsError)).subscribe(e => {
      this.isError = e
    })

    if (!this.currentPlanets!.length && !this.isLoading) {
      this.store.dispatch(loadPlanets())
    }

    if (this.isError) {
      this.router.navigate(['not-found'])
    }
  }
}
