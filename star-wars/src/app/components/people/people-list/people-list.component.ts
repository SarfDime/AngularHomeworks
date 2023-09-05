import { Component, OnInit } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { AppState } from 'src/app/store/app.state'
import { loadPeople } from 'src/app/store/people/people.actions'
import { selectPeopleData, selectPeopleError, selectPeopleLoading } from 'src/app/store/people/people.selectors'

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss']
})
export class PeopleListComponent implements OnInit {
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(loadPeople());
    this.store.pipe(select(selectPeopleData)).subscribe(data => {
      console.log('People:', data)
    })
    this.store.pipe(select(selectPeopleLoading)).subscribe(data => {
      console.log('People Loading:', data)
    })
  }
  
}
