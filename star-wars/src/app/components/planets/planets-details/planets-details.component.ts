import { Component, OnInit } from '@angular/core'
import { Location } from '@angular/common'
import { ActivatedRoute, Router } from '@angular/router'
import { Store, select } from '@ngrx/store'
import { Planet } from 'src/app/modules/planets/planets.interfaces.ts'

import { AppState } from 'src/app/store/app.state'
import { loadPlanet } from 'src/app/store/planet/planet.actions'
import { selectPlanetLoading, selectPlanetData } from 'src/app/store/planet/planet.selectors'


import { selectPlanetsData } from 'src/app/store/planets/planets.selectors'

@Component({
  selector: 'app-planets-details',
  templateUrl: './planets-details.component.html',
})
export class PlanetsDetailsComponent implements OnInit {
  isLoading: boolean = true
  currentPlanet: Planet | undefined
  currentResults: Planet[] = []

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router, private location: Location
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const planetName = params.get('id')
      if (!planetName) {
        this.router.navigate(['planets'])
      } else {
        if (this.currentPlanet && planetName !== this.currentPlanet?.name) {
          this.store.dispatch(loadPlanet({ name: planetName }))
        }

        this.store.pipe(select(selectPlanetsData)).subscribe((e) => {
          const foundPlanet = e.results.find(
            (p: Planet) =>
              p.name.trim().toLowerCase() === planetName!.trim().toLowerCase()
          )

          if (foundPlanet) {
            this.currentPlanet = foundPlanet
          }
        })

        this.store.pipe(select(selectPlanetLoading)).subscribe((e) => {
          this.isLoading = e
        })

        if (!this.currentPlanet && !this.currentResults.length) {
          this.store.dispatch(loadPlanet({ name: planetName }))
        }

        this.store.pipe(select(selectPlanetData)).subscribe((e) => {
          if (e) {
            if (!this.currentPlanet && !this.currentResults.length) {
              if (e!.results.length > 1) {
                this.currentResults = e.results
              } else if (e!.results.length === 1) {
                this.currentPlanet = e.results[0]
              }
            } else {
              if (planetName !== this.currentPlanet?.name) {
                if (e.results.length > 1) {
                  this.currentPlanet = undefined
                  this.currentResults = e.results
                } else {
                  this.currentPlanet = e.results[0]
                }
              }
            }
          }
        })
      }
    })
  }

  onPlanetClick(planetName: string) {
    this.router.navigate(['planet', planetName])
    this.store.dispatch(loadPlanet({ name: planetName }))
  }

  navigateBack() {
    this.location.back()
  }
}
