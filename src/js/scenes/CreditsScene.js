/* global Phaser:true */

import Constants from '../utils/Constants'

class CreditsScene extends Phaser.Scene {
  constructor (test) {
    super({
      key: 'CreditsScene'
    })
  }
  create () {
    console.debug('CreditsScene: init()')

    this.cameras.main.backgroundColor.setTo(188, 60, 100)

    this.titleText = this.add.text(0, 0, 'Credits', {
      font: '97px arcade',
      fill: '#fff'
    })

    this.bodyText = this.add.text(0, 0, 'Game developed by mimoun1997', {
      font: '56px arcade',
      fill: '#fff'
    })

    this.alignElements()
  }

  alignElements () {
    Phaser.Display.Align.In.Center(
      this.titleText,
      this.add.zone(Constants.WIDTH / 2, Constants.HEIGHT / 2 - this.titleText.displayHeight / 2, Constants.WIDTH, Constants.HEIGHT)
    )
    Phaser.Display.Align.In.Center(
      this.bodyText,
      this.add.zone(Constants.WIDTH / 2, Constants.HEIGHT / 2 + this.titleText.displayHeight / 2, Constants.WIDTH, Constants.HEIGHT)
    )
  }

  startGame () {
    this.scene.stop().start('CreditsScene')
    // this.scene.start('LevelBScene')
  }
}

export default CreditsScene
