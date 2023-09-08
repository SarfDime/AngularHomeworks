import { Component } from '@angular/core'
import { HeaderAndFooterService } from 'src/app/services/header-and-footer.service'
import { OpeningService } from 'src/app/services/opening.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  constructor(public headerandfooterservice: HeaderAndFooterService,private openingService: OpeningService) {}
  toggle(){
    this.openingService.toggleOpening()
  }
}
