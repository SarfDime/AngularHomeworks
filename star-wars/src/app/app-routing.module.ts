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
  { path: 'home', component: HomeComponent, canActivate: [HeaderGuard] },
  { path: 'not-found', component: NotFoundComponent, canActivate: [HeaderGuard] },
  { path: 'people', component: PeopleListComponent, canActivate: [HeaderGuard] },
  { path: 'people/:id', component: PeopleDetailsComponent, canActivate: [HeaderGuard] },
  { path: 'planets', component: PlanetsListComponent, canActivate: [HeaderGuard] },
  { path: 'planets/:id', component: PlanetsDetailsComponent, canActivate: [HeaderGuard] },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
