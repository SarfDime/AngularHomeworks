import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { PeopleApiService } from './services/people-api.service'
import { PlanetsApiService } from './services/planets-api.service'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { appReducer } from './store/app.state'
import { PeopleEffects } from './store/people/people.effects'
import { PlanetsEffects } from './store/planets/planets.effects'
import { HttpClientModule } from '@angular/common/http'

import { PeopleListComponent } from './components/people/people-list/people-list.component'
import { PeopleDetailsComponent } from './components/people/people-details/people-details.component'
import { PlanetsListComponent } from './components/planets/planets-list/planets-list.component'

@NgModule({
  declarations: [
    AppComponent,
    PeopleListComponent,
    PlanetsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([PeopleEffects, PlanetsEffects]),
    HttpClientModule
  ],
  providers: [
    PeopleApiService,
    PlanetsApiService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
