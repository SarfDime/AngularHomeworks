import { Injectable } from '@angular/core'

@Injectable({
    providedIn: 'root'
})

export class HeaderAndFooterService {
    showElements = true

    toggleVisibility(show: boolean) {
        this.showElements = show
    }
}
