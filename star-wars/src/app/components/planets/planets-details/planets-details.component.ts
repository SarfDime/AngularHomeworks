import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Store, select } from '@ngrx/store'
import { Planet } from '../../../modules/planets/planets.interfaces.ts'
import { AppState } from 'src/app/store/app.state'
import { loadPlanets } from 'src/app/store/planets/planets.actions'
import { selectPlanetsData, selectPlanetsError, selectPlanetsLoading } from 'src/app/store/planets/planets.selectors'

@Component({
  selector: 'app-planets-details',
  templateUrl: './planets-details.component.html',
  styleUrls: ['./planets-details.component.scss']
})

export class PlanetsDetailsComponent implements OnInit {
  isLoading: boolean = true
  isError = null
  currentPlanet: Planet | undefined

  constructor(private store: Store<AppState>, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.store.pipe(select(selectPlanetsLoading)).subscribe(e => {
      this.isLoading = e
    })

    this.store.pipe(select(selectPlanetsError)).subscribe(e => {
      this.isError = e
    })

    if (!this.currentPlanet && !this.isLoading) {
      this.store.dispatch(loadPlanets())
    }

    if (!this.isLoading) {
      const planetName = this.route.snapshot.paramMap.get('id')
      this.store.pipe(select(selectPlanetsData)).subscribe(e => {
        const foundPlanet = e.results.find((planet: any) =>
          planet.name.trim().toLowerCase() === planetName!.trim().toLowerCase()
        )

        if (!foundPlanet) {
          this.router.navigate(['not-found'])
        } else {
          this.currentPlanet = foundPlanet
        }
      })
    }

    if (this.isError) {
      this.router.navigate(['not-found'])
    }
  }
}
