import Phaser from 'phaser'

export default class CompleteScene extends Phaser.Scene {
  constructor (test) {
    super({
      key: 'CompleteScene'
    })
    this.score = NaN
    this.coinValue = 10
  }

  init (data) {
    let coins = this.registry.get('coins_current')
    this.registry.set('score', coins * this.coinValue)
    this.score = this.registry.get('score')
  }

  create () {
    this.cameras.main.backgroundColor.setTo(76, 175, 80)
    this.cameras.main.backgroundColor.setTo(2, 31, 40)

    let overText = this.add.text(0, 0,
      'LEVEL COMPLETE!',
      {
        font: '97px arcade',
        fill: '#fff'
      })

    let HICHSCORE = this.registry.get('high_score')
    if (this.score > HICHSCORE) {
      HICHSCORE = this.score
    }
    let scoreText = this.add.text(0, 0,
      'High score ' + HICHSCORE,
      {
        font: '56px arcade',
        fill: '#009688'
      })

    let highScore = this.add.text(0, 0,
      'score ' + this.score,
      {
        font: '96px arcade',
        fill: '#2196f3'
      })

    let menuText = this.add.text(0, 0, 'MENU', {
      font: '56px arcade',
      fill: '#f4fc07'
    }).setInteractive()

    // Input Event listeners
    menuText.on('pointerover', () => { menuText.setTint(0x2bff2b) })
    menuText.on('pointerout', () => { menuText.clearTint() })
    menuText.on('pointerdown', () => { this.startGame() })

    //  Center the texts in the game
    Phaser.Display.Align.In.Center(
      overText,
      this.add.zone(this.sys.game.config.width / 2, this.sys.game.config.height / 5, this.sys.game.config.width, this.sys.game.config.height)
    )
    Phaser.Display.Align.In.Center(
      scoreText,
      this.add.zone(this.sys.game.config.width / 2, this.sys.game.config.height / 3, this.sys.game.config.width, this.sys.game.config.height)
    )
    Phaser.Display.Align.In.Center(
      highScore,
      this.add.zone(this.sys.game.config.width / 2, this.sys.game.config.height / 2, this.sys.game.config.width, this.sys.game.config.height)
    )
    Phaser.Display.Align.In.Center(
      menuText,
      this.add.zone(this.sys.game.config.width / 2, this.sys.game.config.height - menuText.displayHeight, this.sys.game.config.width, this.sys.game.config.height)
    )
  }

  startGame () {
    this.scene.stop().start('MenuScene')
  }
}
