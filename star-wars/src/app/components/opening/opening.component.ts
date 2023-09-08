import { Component } from '@angular/core'
import { OpeningService } from 'src/app/services/opening.service'

@Component({
  selector: 'app-opening',
  templateUrl: './opening.component.html',
})

export class OpeningComponent {
  audio: HTMLAudioElement
  readyToAnimate: boolean = false
  introIsDone: boolean = false
  animationStarted: boolean = false

  constructor(private openingService: OpeningService) {
    this.audio = new Audio('assets/sounds.mp3')
  }

  startOpening() {
    this.readyToAnimate = true
    this.playSound()

    setTimeout(() => {
      this.animationStarted = true

      setTimeout(() => {
        this.openingService.setOpeningDone()
      }, 45000)

      setTimeout(() => {
        this.stopSound()
      }, 45000)
    }, 200)
  }

  stopOpening() {
    this.introIsDone = true
    this.stopSound()
    this.openingService.setOpeningDone()
  }

  playSound() {
    this.audio.play()
  }

  stopSound() {
    this.decreaseVolumeSlowly(this.audio, 3)
    setTimeout(() => {
      this.audio.pause()
      this.audio.currentTime = 0
    }, 7000)
  }

  decreaseVolumeSlowly(audio: any, durationInSeconds: number) {
    const initialVolume = audio.volume
    const volumeDecreaseInterval = 0.05
    const numIntervals = Math.ceil(durationInSeconds / volumeDecreaseInterval)
    const volumeStep = initialVolume / numIntervals
  
    const decreaseInterval = setInterval(() => {
      try {
        if (audio.volume > 0) {
          if (volumeStep <= audio.volume) {
            audio.volume -= volumeStep
          } else {
            audio.volume = 0
          }
        } else {
          clearInterval(decreaseInterval)
          audio.pause()
          audio.currentTime = 0
        }
      } catch (error) {
        console.error("Error in decreaseInterval callback:", error)
      }
    }, volumeDecreaseInterval * 1000)
  }
}