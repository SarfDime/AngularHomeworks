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
import { HeaderAndFooterService } from './services/header-and-footer.service'
import { HeaderComponent } from './components/header/header.component'
import { PersonEffects } from './store/person/person.effects'
import { PlanetsDetailsComponent } from './components/planets/planets-details/planets-details.component'
import { PlanetEffects } from './store/planet/planet.effects'
import { FormsModule } from '@angular/forms'
import { HomeComponent } from './components/home/home.component'
import { FooterComponent } from './components/footer/footer.component'
import { BackgroundComponent } from './components/background/background.component'
import { OpeningComponent } from './components/opening/opening.component'
import { OpeningService } from './services/opening.service'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    PeopleListComponent,
    PlanetsListComponent,
    PeopleDetailsComponent,
    PlanetsDetailsComponent,
    FooterComponent,
    BackgroundComponent,
    OpeningComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([PeopleEffects, PlanetsEffects, PersonEffects, PlanetEffects]),
    HttpClientModule,
    FormsModule
  ],
  providers: [PeopleApiService, PlanetsApiService, HeaderAndFooterService, OpeningService],
  bootstrap: [AppComponent]
})
export class AppModule { }
