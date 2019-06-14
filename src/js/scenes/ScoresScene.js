import Phaser from 'phaser'

// import Constants from '../utils/Constants'

class ScoresScene extends Phaser.Scene {
  constructor (test) {
    super({
      key: 'ScoresScene'
    })
  }
  create () {
    console.debug('ScoresScene: init()')

    // this.cameras.main.backgroundColor.setTo(50,188,30)

    this.titleText = this.add.text(0, 0, 'HIGH SCORE', {
      font: '155px arcade',
      fill: '#fff'
    })

    let SCORE = 500
    this.primer = this.add.text(0, 0, SCORE, {
      font: '96px arcade',
      fill: 'yellow'
    })

    this.backButton = this.add.image(0, 0, 'back').setInteractive()
    this.backButton.flipX = true
    this.backButton.setScale(1.61803, 1.61803)
    this.backButton.on('pointerover', () => { this.backButton.alpha = 0.7 })
    this.backButton.on('pointerout', () => { this.backButton.alpha = 1 })
    this.backButton.on('pointerdown', () => { this.scene.start('MenuScene') })

    this.alignElements()
  }

  alignElements () {
    Phaser.Display.Align.In.Center(
      this.titleText,
      this.add.zone(this.sys.game.config.width / 2, this.sys.game.config.height / 2 - this.titleText.displayHeight, this.sys.game.config.width, this.sys.game.config.height)
    )

    Phaser.Display.Align.In.Center(
      this.primer,
      this.add.zone(this.sys.game.config.width / 2, this.sys.game.config.height / 2, this.sys.game.config.width, this.sys.game.config.height)
    )

    Phaser.Display.Align.In.Center(
      this.backButton,
      this.add.zone(this.sys.game.config.width / 2, this.sys.game.config.height / 2 + this.primer.displayHeight + 160, this.sys.game.config.width, this.sys.game.config.height)
    )
  }

  startGame () {
    this.scene.stop().start('LevelBScene')
    // this.scene.start('LevelBScene')
  }
}

export default ScoresScene
