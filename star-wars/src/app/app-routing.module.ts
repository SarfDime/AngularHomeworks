import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { PeopleDetailsComponent } from './components/people/people-details/people-details.component'
import { PeopleListComponent } from './components/people/people-list/people-list.component'
import { PlanetsDetailsComponent } from './components/planets/planets-details/planets-details.component'
import { PlanetsListComponent } from './components/planets/planets-list/planets-list.component'
import { HomeComponent } from './components/home/home.component'
import { NotFoundComponent } from './components/not-found/not-found.component'
import { HeaderGuard } from './guards/header.guard'

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [HeaderGuard], pathMatch: 'full' },
  
  { path: 'people', component: PeopleListComponent, canActivate: [HeaderGuard] },
  { path: 'person/:id', component: PeopleDetailsComponent, canActivate: [HeaderGuard] },
  { path: 'person', redirectTo: '/people' },
  { path: 'people/:id', component: PeopleListComponent, canActivate: [HeaderGuard] },

  { path: 'planets', component: PlanetsListComponent, canActivate: [HeaderGuard] },
  { path: 'planet/:id', component: PlanetsDetailsComponent, canActivate: [HeaderGuard] },
  { path: 'planet', redirectTo: '/planets' },
  { path: 'planets/:id', component: PlanetsListComponent, canActivate: [HeaderGuard] },

  { path: 'not-found', component: NotFoundComponent, canActivate: [HeaderGuard] },
  { path: '**', redirectTo: '/not-found' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
