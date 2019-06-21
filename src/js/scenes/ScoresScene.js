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

    this.cameras.main.setBackgroundColor('#021f28')

    this.clickSound = this.sound.add('click')

    this.titleText = this.add.text(0, 0, 'HIGH SCORE', {
      font: '155px arcade',
      fill: '#fff'
    })

    let SCORE = this.registry.get('high_score')
    this.primer = this.add.text(0, 0, SCORE, {
      font: '96px arcade',
      fill: 'yellow'
    })

    this.backButton = this.add.image(0, 0, 'back').setInteractive()
    this.backButton.flipX = true
    this.backButton.setScale(1.61803, 1.61803)
    this.backButton.on('pointerover', () => { this.backButton.alpha = 0.7 })
    this.backButton.on('pointerout', () => { this.backButton.alpha = 1 })
    this.backButton.on('pointerdown',
      () => {
        this.clickSound.play()
        this.scene.stop().start('MenuScene')
      })

    this.alignElements()
  }

  alignElements () {
    let HEIGHT = this.sys.game.config.height
    let WIDTH = this.sys.game.config.width

    Phaser.Display.Align.In.Center(
      this.titleText,
      this.add.zone(WIDTH / 2, HEIGHT / 2 - this.titleText.displayHeight, WIDTH, HEIGHT)
    )

    Phaser.Display.Align.In.Center(
      this.primer,
      this.add.zone(WIDTH / 2, HEIGHT / 2, WIDTH, HEIGHT)
    )

    Phaser.Display.Align.In.Center(
      this.backButton,
      this.add.zone(WIDTH / 2, HEIGHT / 2 + this.primer.displayHeight + 160, WIDTH, HEIGHT)
    )
  }

  startGame () {
    this.scene.stop().start('LevelBScene')
    // this.scene.start('LevelBScene')
  }
}

export default ScoresScene
