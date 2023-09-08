import { Component } from '@angular/core'
import { HeaderAndFooterService } from 'src/app/services/header-and-footer.service'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  constructor(public headerandfooterservice: HeaderAndFooterService) { }
}
