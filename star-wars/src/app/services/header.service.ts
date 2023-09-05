import { Injectable } from '@angular/core'

@Injectable({
    providedIn: 'root'
})

export class HeaderService {
    showHeader = true

    toggleHeaderVisibility(show: boolean) {
        this.showHeader = show
    }
}
