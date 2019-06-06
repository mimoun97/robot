/* global Phaser:true */

import Constants from '../utils/Constants'

class LevelAScene extends Phaser.Scene {
  constructor (test) {
    super({
      key: 'LevelAScene'
    })
  }
  create () {
    console.debug('LevelAScene: init()')

    this.cameras.main.backgroundColor.setTo(0, 188, 212)

    this.titleText = this.add.text(0, 0, 'Level A', {
      font: '97px arcade',
      fill: '#fff'
    })

    this.alignElements()
  }

  alignElements () {
    Phaser.Display.Align.In.Center(
      this.titleText,
      this.add.zone(Constants.WIDTH / 2, Constants.HEIGHT / 2 - this.titleText.displayHeight / 2, Constants.WIDTH, Constants.HEIGHT)
    )
  }

  startGame () {
    this.scene.stop().start('LevelBScene')
    // this.scene.start('LevelBScene')
  }
}

export default LevelAScene
