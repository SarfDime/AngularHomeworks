import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class OpeningService {
  private openingDoneSubject = new BehaviorSubject<boolean>(false)
  openingDone$ = this.openingDoneSubject.asObservable()

  private openingDone: boolean = false

  constructor() {
    const openingDoneSetting = localStorage.getItem('openingDone')
    if (openingDoneSetting === 'true') {
      this.openingDone = true
    }
    this.openingDoneSubject.next(this.openingDone)
  }

  setOpeningDone() {
    this.openingDone = true
    this.openingDoneSubject.next(this.openingDone)
  }

  toggleOpening(){
    const openingDoneSetting = localStorage.getItem('openingDone')
    if (openingDoneSetting === 'true') {
      this.openingDone = false
    localStorage.removeItem('openingDone')
    this.openingDoneSubject.next(this.openingDone)
    } else{
      this.openingDone = true
      localStorage.setItem('openingDone', 'true');
      this.openingDoneSubject.next(this.openingDone)
    }
  }
}
