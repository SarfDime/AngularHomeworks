import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate } from '@angular/router'
import { HeaderAndFooterService } from '../services/header-and-footer.service'

@Injectable({
    providedIn: 'root'
})
export class HeaderGuard implements CanActivate {
    constructor(private headerService: HeaderAndFooterService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const path = state.url

        if (path === '/not-found') {
            this.headerService.toggleVisibility(false)
        } else {
            this.headerService.toggleVisibility(true)
        }

        return true
    }
}
