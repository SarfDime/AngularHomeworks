import { Component, OnInit } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { PeopleState } from 'src/app/store/people/people.reducer'

@Component({
  selector: 'app-people-details',
  templateUrl: './people-details.component.html',
  styleUrls: ['./people-details.component.scss']
})
export class PeopleDetailsComponent implements OnInit {

  constructor(private store: Store<PeopleState>) {}

  ngOnInit() {
    // this.store.pipe(select('data')).subscribe(state => {
    //   // console.log('State after loadPeopleSuccess:', state)
    // })
  }

}
