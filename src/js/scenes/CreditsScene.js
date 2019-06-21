import Phaser from 'phaser'

class CreditsScene extends Phaser.Scene {
  constructor (test) {
    super({
      key: 'CreditsScene'
    })
  }
  create () {
    this.cameras.main.setBackgroundColor('#021f28')

    this.clickSound = this.sound.add('click')

    this.titleText = this.add.text(0, 0, 'Info', {
      font: '155px arcade',
      fill: '#fff'
    })

    this.bodyText = this.add.text(0, 0, 'Get all coins \nor \nTake the key \nto complete a level!', {
      font: '56px arcade',
      fill: '#fff'
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
      this.add.zone(WIDTH / 2, HEIGHT / 4, WIDTH, HEIGHT)
    )
    Phaser.Display.Align.In.Center(
      this.bodyText,
      this.add.zone(WIDTH / 2, HEIGHT / 2, WIDTH, HEIGHT)
    )

    Phaser.Display.Align.In.Center(
      this.backButton,
      this.add.zone(WIDTH / 2, HEIGHT - this.backButton.displayHeight, WIDTH, HEIGHT)
    )
  }

  startGame () {
    this.scene.stop().start('CreditsScene')
    // this.scene.start('LevelBScene')
  }
}

export default CreditsScene
