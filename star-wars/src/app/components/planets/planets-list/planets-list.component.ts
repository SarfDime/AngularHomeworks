import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { loadPlanets } from 'src/app/store/planets/planets.actions';
import { selectPlanetsData, selectPlanetsLoading } from 'src/app/store/planets/planets.selectors';

@Component({
  selector: 'app-planets-list',
  templateUrl: './planets-list.component.html',
  styleUrls: ['./planets-list.component.scss']
})
export class PlanetsListComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(loadPlanets());
    this.store.pipe(select(selectPlanetsData)).subscribe(data => {
      console.log('Planets:', data)
    })
    this.store.pipe(select(selectPlanetsLoading)).subscribe(data => {
      console.log('Planets Loading:', data)
    })
  }
}
