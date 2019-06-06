/* global Phaser:true */

import Constants from '../utils/Constants'

class LevelBScene extends Phaser.Scene {
  constructor (test) {
    super({
      key: 'LevelBScene'
    })
  }
  create () {
    console.debug('LevelBScene: init()')

    this.cameras.main.backgroundColor.setTo(188, 212, 0)

    this.titleText = this.add.text(0, 0, 'Level B', {
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

  goMenu () {
    this.scene.stop().start('LevelBScene')
    // this.scene.start('LevelBScene')
  }
}

export default LevelBScene
