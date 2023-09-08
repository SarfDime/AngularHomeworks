import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { HeaderAndFooterService } from 'src/app/services/header-and-footer.service'

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
})
export class NotFoundComponent {
  constructor(private router: Router, private headerService: HeaderAndFooterService) { }

  ngOnInit(): void {
    this.headerService.toggleVisibility(false)
  }

  navigateToHome() {
    this.router.navigate(['/'])
  }
}
