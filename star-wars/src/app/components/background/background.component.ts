import { Component, OnInit, OnDestroy } from '@angular/core'

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
})

export class BackgroundComponent implements OnInit, OnDestroy {
  numberOfStars = 200
  circleRadius = 1
  stars: { x: string, y: string, className: string }[] = []

  ngOnInit() {
    this.updateCircleRadius()
    window.addEventListener('resize', this.updateCircleRadius.bind(this))
    this.generateRandomStars()
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.updateCircleRadius.bind(this))
  }

  updateCircleRadius() {
    const screenWidth = window.innerWidth
    let newCircleRadius = 1

    if (screenWidth < 2000) {
      const difference = (2000 - screenWidth) / 300
      newCircleRadius = 1 - difference * 0.1
    } else if (screenWidth > 2000) {
      const difference = (screenWidth - 2000) / 300
      newCircleRadius = 1 + difference * 0.1
    }

    this.circleRadius = newCircleRadius
  }

  generateRandomStars() {
    for (let i = 0; i < this.numberOfStars; i++) {
      const x = `${Math.floor(Math.random() * 100)}%`
      const y = `${Math.floor(Math.random() * 100)}%`
      this.stars.push({ x, y, className: `star star-${i + 1}` })
    }
  }
}
