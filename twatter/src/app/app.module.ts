import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { initializeApp,provideFirebaseApp } from '@angular/fire/app'
import { environment } from '../environments/environment'
import { provideAuth,getAuth } from '@angular/fire/auth'
import { provideFirestore,getFirestore } from '@angular/fire/firestore'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { PostsService } from './services/posts.service'
import { PostsEffects } from './store/posts/posts.effects'
import { appReducer } from './store/app.state'
import { PostsComponent } from './components/posts/posts.component'
import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    EffectsModule.forRoot([PostsEffects]),
    StoreModule.forRoot(appReducer),
    FormsModule
  ],
  providers: [PostsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
