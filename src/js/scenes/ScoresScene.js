/* global Phaser:true */

import Constants from '../utils/Constants'

class ScoresScene extends Phaser.Scene {
  constructor (test) {
    super({
      key: 'ScoresScene'
    })
  }
  create () {
    console.debug('ScoresScene: init()')

    // this.cameras.main.backgroundColor.setTo(50,188,30)

    this.titleText = this.add.text(0, 0, 'Scores', {
      font: '97px arcade',
      fill: '#fff'
    })

    this.primer = this.add.text(0, 0, 'John Smith: ' + 231, {
      font: '63px arcade',
      fill: 'yellow'
    })

    this.segon = this.add.text(0, 0, 'Angelina Jolie: ' + 180, {
      font: '56px arcade',
      fill: '#fff'
    })

    this.tercer = this.add.text(0, 0, 'asdasdas: ' + 110, {
      font: '56px arcade',
      fill: '#fff'
    })

    this.alignElements()
  }

  alignElements () {
    Phaser.Display.Align.In.Center(
      this.titleText,
      this.add.zone(Constants.WIDTH / 2, Constants.HEIGHT / 2 - this.titleText.displayHeight * 2, Constants.WIDTH, Constants.HEIGHT)
    )

    Phaser.Display.Align.In.Center(
      this.primer,
      this.add.zone(Constants.WIDTH / 2, Constants.HEIGHT / 2 + this.segon.displayHeight, Constants.WIDTH, Constants.HEIGHT)
    )

    Phaser.Display.Align.In.Center(
      this.segon,
      this.add.zone(Constants.WIDTH / 2, Constants.HEIGHT / 2 + this.segon.displayHeight * 3, Constants.WIDTH, Constants.HEIGHT)
    )

    Phaser.Display.Align.In.Center(
      this.tercer,
      this.add.zone(Constants.WIDTH / 2, Constants.HEIGHT / 2 + this.segon.displayHeight * 4, Constants.WIDTH, Constants.HEIGHT)
    )
  }

  startGame () {
    this.scene.stop().start('LevelBScene')
    // this.scene.start('LevelBScene')
  }
}

export default ScoresScene
