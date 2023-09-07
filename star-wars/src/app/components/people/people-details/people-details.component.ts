import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core'
import { Location } from '@angular/common'
import { ActivatedRoute, Router } from '@angular/router'
import { Store, select } from '@ngrx/store'
import { Person } from 'src/app/modules/people/people.interfaces.ts'
import { AppState } from 'src/app/store/app.state'
import { selectPeopleData } from 'src/app/store/people/people.selectors'
import { loadPerson } from 'src/app/store/person/person.actions'
import { selectPersonData, selectPersonLoading } from 'src/app/store/person/person.selectors'

@Component({
  selector: 'app-people-details',
  templateUrl: './people-details.component.html',
})

export class PeopleDetailsComponent implements OnInit {
  isLoading: boolean = true
  currentPerson: Person | undefined
  currentResults: Person[] = []

  constructor(private store: Store<AppState>, private route: ActivatedRoute, private router: Router, private location: Location) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const personName = params.get('id')

      if (!personName) {
        this.router.navigate(['people'])
      } else {
        if (this.currentPerson && personName !== this.currentPerson?.name) {
          this.store.dispatch(loadPerson({ name: personName }))
        }

        this.store.pipe(select(selectPeopleData)).subscribe(e => {
          const foundPerson = e.results.find((p: Person) =>
            p.name.trim().toLowerCase() === personName!.trim().toLowerCase()
          )

          if (foundPerson) {
            this.currentPerson = foundPerson
          }
        })

        this.store.pipe(select(selectPersonLoading)).subscribe(e => {
          this.isLoading = e
        })

        if (!this.currentPerson && !this.currentResults.length) {
          this.store.dispatch(loadPerson({ name: personName }))
        }

        this.store.pipe(select(selectPersonData)).subscribe(e => {
          if (e) {
            if (!this.currentPerson && !this.currentResults.length) {
              if (e!.results.length > 1) {
                this.currentResults = e.results
              } else if (e!.results.length === 1) {
                this.currentPerson = e.results[0]
              }
            } else {
              if (personName !== this.currentPerson?.name) {
                if(e.results.length > 1) {
                  this.currentPerson = undefined
                  this.currentResults = e.results
                } else{
                  this.currentPerson = e.results[0]
                }
              }
            }
          }
        })
      }
    })
  }

  onPersonClick(personName: string) {
    this.router.navigate(['person', personName])
    this.store.dispatch(loadPerson({ name: personName }))
  }

  navigateBack() {
    this.location.back()
  }
}
