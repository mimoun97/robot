import Phaser from 'phaser'

import Constants from '../utils/Constants'

class MenuScene extends Phaser.Scene {
  constructor (test) {
    super({
      key: 'MenuScene'
    })
  }

  create () {
    // load and play bg music
    this.music = this.sound.add('MenuMusic')
    this.music.setLoop(true)
    this.music.play()

    this.clickSound = this.sound.add('click')

    this.cameras.main.backgroundColor.setTo('#000')

    this.bg = this.add.image(0, 0, 'bg')

    this.titleText = this.add.text(0, 0, Constants.TITLE, {
      font: '256px arcade',
      fill: '#fff'
    })

    this.authorText = this.add.text(0, 0, Constants.AUTHOR, {
      font: '97.7px arcade',
      fill: '#bfc0c1'
    })

    this.authorText.setInteractive()
    this.authorText.on('pointerover', () => { this.authorText.alpha = 0.7 })
    this.authorText.on('pointerout', () => { this.authorText.alpha = 1 })
    this.authorText.on('pointerdown',
      () => {
        this.clickSound.play()
        let win = window.open(Constants.AUTHOR_URL, '_blank')
        win.focus()
      })

    this.startButton = this.add.sprite(0, 0, 'start').setInteractive()
    this.startButton.setScale(1.61803, 1.61803)
    this.startButton.on('pointerover', () => { this.startButton.alpha = 0.7 })
    this.startButton.on('pointerout', () => { this.startButton.alpha = 1 })
    this.startButton.on('pointerdown', () => { this.startGame() })

    this.scoresButton = this.add.sprite(0, 0, 'scores').setInteractive()
    this.scoresButton.setScale(1.61803, 1.61803)
    this.scoresButton.on('pointerover', () => { this.scoresButton.alpha = 0.7 })
    this.scoresButton.on('pointerout', () => { this.scoresButton.alpha = 1 })
    this.scoresButton.on('pointerdown', () => { this.startScores() })

    this.fullscreenButton = this.add.sprite(0, 0, 'fullscreen').setInteractive()
    this.fullscreenButton.setScale(1.61803, 1.61803)
    this.fullscreenButton.on('pointerover', () => { this.fullscreenButton.alpha = 0.7 })
    this.fullscreenButton.on('pointerout', () => { this.fullscreenButton.alpha = 1 })
    this.fullscreenButton.on('pointerdown', () => { this.fullscreen() })

    // music button
    this.musicButton = this.add.image(0, 0, 'music').setInteractive()
    this.musicButton.setScale(1.61803, 1.61803)
    this.musicButton.on('pointerover', () => { this.musicButton.alpha = 0.7 })
    this.musicButton.on('pointerout', () => { this.musicButton.alpha = 1 })
    this.musicButton.on('pointerdown',
      () => {
        this.clickSound.play() // play click sound
        let isMute = this.sound.mute
        this.sound.setMute(!isMute)
        this.musicButton.setFrame(isMute ? 0 : 1)
      })

    // info button
    this.infoButton = this.add.image(0, 0, 'info').setInteractive()
    this.infoButton.setScale(1.61803, 1.61803)
    this.infoButton.on('pointerover', () => { this.infoButton.alpha = 0.7 })
    this.infoButton.on('pointerout', () => { this.infoButton.alpha = 1 })
    this.infoButton.on('pointerdown', () => { this.startCredits() })

    this.alignElements()
  }

  alignElements () {
    let HEIGHT = this.sys.game.config.height
    let WIDTH = this.sys.game.config.width

    Phaser.Display.Align.In.Center(
      this.titleText,
      this.add.zone(WIDTH / 2 + WIDTH / 30, HEIGHT / 2 - this.titleText.displayHeight / 2, WIDTH, HEIGHT)
    )

    Phaser.Display.Align.In.Center(
      this.bg,
      this.add.zone(WIDTH / 2, HEIGHT / 2 - this.titleText.displayHeight / 2, WIDTH, HEIGHT)
    )

    Phaser.Display.Align.In.Center(
      this.authorText,
      this.add.zone(WIDTH / 2, HEIGHT - this.authorText.displayHeight, WIDTH, HEIGHT)
    )

    // this.sys.game.config.width / 2, this.sys.game.config.height / 2

    Phaser.Display.Align.In.Center(
      this.startButton,
      this.add.zone(WIDTH / 2 + this.startButton.displayWidth, HEIGHT / 2, WIDTH, HEIGHT)
    )

    Phaser.Display.Align.In.Center(
      this.fullscreenButton,
      this.add.zone(WIDTH / 2, HEIGHT / 2, WIDTH, HEIGHT)
    )

    Phaser.Display.Align.In.Center(
      this.scoresButton,
      this.add.zone(WIDTH / 2 - this.startButton.displayWidth, HEIGHT / 2, WIDTH, HEIGHT)
    )

    Phaser.Display.Align.In.Center(
      this.musicButton,
      this.add.zone(WIDTH - 100, 100, WIDTH, HEIGHT)
    )

    Phaser.Display.Align.In.Center(
      this.infoButton,
      this.add.zone(100, 100, WIDTH, HEIGHT)
    )
  }

  fullscreen () {
    this.clickSound.play()
    // FIXME: dont work well
    if (this.scale.isFullscreen) {
      this.scale.stopFullscreen()
    } else {
      this.scale.startFullscreen()
    }
  }

  startGame () {
    this.clickSound.play()
    this.music.stop()
    this.scene.launch('UIScene')
    this.scene.stop().start('LevelAScene')
  }

  startScores () {
    this.clickSound.play()
    this.music.stop()
    this.scene.start('ScoresScene')
  }

  startCredits () {
    this.clickSound.play()
    this.music.stop()
    this.scene.start('CreditsScene')
  }
}

export default MenuScene
