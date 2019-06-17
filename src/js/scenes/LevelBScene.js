import Phaser from 'phaser'

import Constants from '../utils/Constants'

class LevelBScene extends Phaser.Scene {
  constructor (test) {
    super({
      key: 'LevelBScene'
    })
  }
  create () {
    console.debug('LevelBScene: init()')

    this.cameras.main.backgroundColor.setTo(0, 0, 0)

    this.titleText = this.add.text(0, 0, 'TODO    Level B', {
      font: '97px arcade',
      fill: '#fff'
    })

    this.alignElements()

    this.createLevel()
  }

  alignElements () {
    Phaser.Display.Align.In.Center(
      this.titleText,
      this.add.zone(this.sys.game.config.width / 2, this.sys.game.config.height / 2 - this.titleText.displayHeight / 2, Constants.WIDTH, Constants.HEIGHT)
    )
  }

  goMenu () {
    this.scene.stop().start('LevelBScene')
    // this.scene.start('LevelBScene')
  }

  createLevel () {
    // Phaser supports multiple cameras, but you can access the default camera like this:
    this.camera = this.cameras.main
    this.camera.zoom = 1.61803
  }
}

export default LevelBScene
