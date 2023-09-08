import { Component, HostListener } from '@angular/core'
import { OpeningService } from './services/opening.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  openingDone: boolean = false
  screenWidthChecked: boolean = false

  constructor(private openingService: OpeningService) {
    this.openingService.openingDone$.subscribe((openingDone) => {
      this.openingDone = openingDone
    })
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkScreenWidth()
  }

  ngAfterViewInit() {
    this.checkScreenWidth()
  }

  private checkScreenWidth() {
    const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth

    if (screenWidth < 1440) {
      this.openingDone = true
      this.screenWidthChecked = true
    }
  }
}
