import { Component, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from "@angular/router"
import { Store, select } from "@ngrx/store"
import { Planet } from "src/app/modules/planets/planets.interfaces.ts"
import { AppState } from "src/app/store/app.state"
import { loadPlanets } from "src/app/store/planets/planets.actions"
import {
  selectPlanetsData,
  selectPlanetsLoading,
} from "src/app/store/planets/planets.selectors"

@Component({
  selector: "app-planets-list",
  templateUrl: "./planets-list.component.html",
})
export class PlanetsListComponent implements OnInit {
  isLoading: boolean = true
  currentPlanets: Planet[] | undefined
  nextPage: number | null | undefined
  previousPage: number | null | undefined
  pageNumber: number = 1
  currentPageNumber: number = 1

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.store.pipe(select(selectPlanetsData)).subscribe((e) => {
      this.currentPlanets = e.results
      this.nextPage = Number(e.next?.charAt(e.next.length - 1))
      this.previousPage = Number(e.previous?.charAt(e.previous.length - 1))
    })

    this.store.pipe(select(selectPlanetsLoading)).subscribe((e) => {
      this.isLoading = e
    })

    const currentPage = this.route.snapshot.paramMap.get("id")

    if (currentPage) {
      this.pageNumber = Number(currentPage)
      this.currentPageNumber = Number(currentPage)
      const currentPageNumber = Number(currentPage)
      if (!isNaN(currentPageNumber)) {
        if (
          currentPageNumber + 1 !== this.nextPage &&
          currentPageNumber - 1 !== this.previousPage
        ) {
          this.store.dispatch(loadPlanets({ page: currentPageNumber }))
        }
      }
    } else if (!currentPage) {
      this.router.navigate(["planets", 1])
    }

    if (!this.currentPlanets?.length && !this.isLoading) {
      this.store.dispatch(loadPlanets({ page: 0 }))
    }
  }

  onPlanetClick(planetName: string) {
    this.router.navigate(["planet", planetName])
  }

  onNextPage() {
    if (this.nextPage) {
      this.store.dispatch(loadPlanets({ page: this.nextPage }))
      this.router.navigate(["planets", this.nextPage])
    }
  }

  onPreviousPage() {
    if (this.previousPage) {
      this.store.dispatch(loadPlanets({ page: this.previousPage }))
      this.router.navigate(["planets", this.previousPage])
    }
  }

  onSubmitPage() {
    this.onToPage(this.pageNumber)
  }

  onToPage(pageNumber: number) {
    this.store.dispatch(loadPlanets({ page: pageNumber }))
    this.router.navigate(["planets", pageNumber])
  }
}
