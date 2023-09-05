import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Store, select } from '@ngrx/store'
import { Person } from 'src/app/modules/people/people.interfaces.ts'
import { AppState } from 'src/app/store/app.state'
import { loadPeople } from 'src/app/store/people/people.actions'
import { selectPeopleData, selectPeopleLoading } from 'src/app/store/people/people.selectors'

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss']
})

export class PeopleListComponent implements OnInit {
  isLoading: boolean = true
  currentPeople: Person[] | undefined

  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit() {
    this.store.pipe(select(selectPeopleData)).subscribe(e => {
      this.currentPeople = e.results
    })

    this.store.pipe(select(selectPeopleLoading)).subscribe(e => {
      this.isLoading = e
    })
    // const personName = this.route.snapshot.paramMap.get('id') TODOOO THIS
    if (!this.currentPeople!.length && !this.isLoading) {
      this.store.dispatch(loadPeople({ page: 0 }))
    }
  }

  personClick(name: string) {

  }
}
