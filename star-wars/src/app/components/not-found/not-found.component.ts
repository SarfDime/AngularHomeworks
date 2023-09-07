import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { HeaderService } from 'src/app/services/header.service'

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
})
export class NotFoundComponent {
  constructor(private router: Router, private headerService: HeaderService) { }

  ngOnInit(): void {
    this.headerService.toggleHeaderVisibility(false)
  }

  navigateToHome() {
    this.router.navigate(['/home'])
  }
}
