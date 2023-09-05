import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Store, select } from '@ngrx/store'
import { Person } from 'src/app/modules/people/people.interfaces.ts'
import { AppState } from 'src/app/store/app.state'
import { loadPeople } from 'src/app/store/people/people.actions'
import { selectPeopleData, selectPeopleError, selectPeopleLoading } from 'src/app/store/people/people.selectors'

@Component({
  selector: 'app-people-details',
  templateUrl: './people-details.component.html',
  styleUrls: ['./people-details.component.scss']
})

export class PeopleDetailsComponent implements OnInit {
  isLoading: boolean = true
  currentPerson: Person | undefined

  constructor(private store: Store<AppState>, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.store.pipe(select(selectPeopleLoading)).subscribe(e => {
      this.isLoading = e
    })

    if(!this.currentPerson && !this.isLoading){
      this.store.dispatch(loadPeople({ page: 0 }))
    }

    if (!this.isLoading) {
      const personName = this.route.snapshot.paramMap.get('id')
      this.store.pipe(select(selectPeopleData)).subscribe(e => {
        const foundPerson = e.results.find((p: any) =>
          p.name.trim().toLowerCase() === personName!.trim().toLowerCase()
        )

        if (!foundPerson) {
          this.router.navigate(['not-found'])
        } else {
          this.currentPerson = foundPerson
        }
      })
    }
  }
}
