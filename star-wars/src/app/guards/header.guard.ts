import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate } from '@angular/router'
import { HeaderService } from '../services/header.service'

@Injectable({
    providedIn: 'root'
})
export class HeaderGuard implements CanActivate {
    constructor(private headerService: HeaderService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const path = state.url

        if (path === '/not-found') {
            this.headerService.toggleHeaderVisibility(false)
        } else {
            this.headerService.toggleHeaderVisibility(true)
        }

        return true
    }
}
