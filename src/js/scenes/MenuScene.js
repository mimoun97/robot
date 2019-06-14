import Phaser from 'phaser'

import Constants from '../utils/Constants'

class MenuScene extends Phaser.Scene {
  constructor (test) {
    super({
      key: 'MenuScene'
    })
  }
  create () {
    console.debug('MenuScene: init()')
    console.log(Constants.TITLE)

    this.cameras.main.backgroundColor.setTo(96, 125, 139) // (0,188,212)

    this.titleText = this.add.text(0, 0, Constants.TITLE, {
      font: '256px arcade',
      fill: '#fff'
    })

    this.authorText = this.add.text(0, 0, Constants.AUTHOR, {
      font: '97.7px arcade',
      fill: '#fff'
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

    this.alignElements()
  }

  alignElements () {
    Phaser.Display.Align.In.Center(
      this.titleText,
      this.add.zone(this.sys.game.config.width / 2, this.sys.game.config.height / 2 - this.titleText.displayHeight / 2, this.sys.game.config.width, this.sys.game.config.height)
    )
    Phaser.Display.Align.In.Center(
      this.authorText,
      this.add.zone(this.sys.game.config.width / 2, this.sys.game.config.height / 2 + this.titleText.displayHeight, this.sys.game.config.width, this.sys.game.config.height)
    )

    // this.sys.game.config.width / 2, this.sys.game.config.height / 2

    Phaser.Display.Align.In.Center(
      this.startButton,
      this.add.zone(this.sys.game.config.width / 2 + this.startButton.displayWidth, this.sys.game.config.height / 2, this.sys.game.config.width, this.sys.game.config.height)
    )

    Phaser.Display.Align.In.Center(
      this.fullscreenButton,
      this.add.zone(this.sys.game.config.width / 2, this.sys.game.config.height / 2, this.sys.game.config.width, this.sys.game.config.height)
    )

    Phaser.Display.Align.In.Center(
      this.scoresButton,
      this.add.zone(this.sys.game.config.width / 2 - this.startButton.displayWidth, this.sys.game.config.height / 2, this.sys.game.config.width, this.sys.game.config.height)
    )
  }

  fullscreen () {
    // TODO fullscreen 800x600?
    // if (this.scale.isfullscreen) {
    //   console.log('IS_fullscreen')
    //   this.scale.stopfullscreen()
    //   // On stop fulll screen
    // } else {
    //   console.log('START fullscreen')
    //   this.scale.startfullscreen()
    //   // On start fulll screen
    // }
  }

  startGame () {
    this.scene.start('LevelAScene')
  }

  startScores () {
    this.scene.start('ScoresScene')
  }
}

export default MenuScene
