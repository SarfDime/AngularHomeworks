import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { Person } from "src/app/modules/people/people.interfaces.ts";
import { AppState } from "src/app/store/app.state";
import { loadPeople } from "src/app/store/people/people.actions";
import {
  selectPeopleData,
  selectPeopleLoading,
} from "src/app/store/people/people.selectors";

@Component({
  selector: "app-people-list",
  templateUrl: "./people-list.component.html",
})
export class PeopleListComponent implements OnInit {
  isLoading: boolean = true;
  currentPeople: Person[] | undefined;
  nextPage: number | null | undefined;
  previousPage: number | null | undefined;
  pageNumber: number = 1;
  currentPageNumber: number = 1;
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.store.pipe(select(selectPeopleData)).subscribe((e) => {
      this.currentPeople = e.results;
      this.nextPage = Number(e.next?.charAt(e.next.length - 1));
      this.previousPage = Number(e.previous?.charAt(e.previous.length - 1));
    });

    this.store.pipe(select(selectPeopleLoading)).subscribe((e) => {
      this.isLoading = e;
    });

    const currentPage = this.route.snapshot.paramMap.get("id");

    if (currentPage) {
      this.pageNumber = Number(currentPage);
      this.currentPageNumber = Number(currentPage);
      const currentPageNumber = Number(currentPage);
      if (!isNaN(currentPageNumber)) {
        if (
          currentPageNumber + 1 !== this.nextPage &&
          currentPageNumber - 1 !== this.previousPage
        ) {
          this.store.dispatch(loadPeople({ page: currentPageNumber }));
        }
      }
    } else if (!currentPage) {
      this.router.navigate(["people", 1]);
    }

    if (!this.currentPeople!.length && !this.isLoading) {
      this.store.dispatch(loadPeople({ page: 0 }));
    }
  }

  onPersonClick(personName: string) {
    this.router.navigate(["person", personName]);
  }

  onNextPage() {
    if (this.nextPage) {
      this.store.dispatch(loadPeople({ page: this.nextPage }));
      this.router.navigate(["people", this.nextPage]);
    }
  }

  onPreviousPage() {
    if (this.previousPage) {
      this.store.dispatch(loadPeople({ page: this.previousPage }));
      this.router.navigate(["people", this.previousPage]);
    }
  }

  onSubmitPage() {
    this.onToPage(this.pageNumber);
  }
  
  onToPage(pageNumber: number) {
    this.store.dispatch(loadPeople({ page: pageNumber }));
    this.router.navigate(["people", pageNumber]);
  }
}
