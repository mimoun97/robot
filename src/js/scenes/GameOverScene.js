import Phaser from 'phaser'

export default class GameOverScene extends Phaser.Scene {
  constructor (test) {
    super({
      key: 'GameOverScene'
    })
    this.score = NaN
    this.coinValue = 10
  }

  init (data) {
    let coins = this.registry.get('coins_current')
    this.registry.set('score', coins * this.coinValue)
    this.score = this.registry.get('score')

    // set highscore in localstorage
    let highScore = this.registry.get('high_score')
    localStorage.setItem('high_score', highScore > this.score ? highScore : this.score)
  }

  create () {
    this.cameras.main.setBackgroundColor('#021f28')

    // load and play bg music
    this.music = this.sound.add('GameOverMusic')
    this.music.setLoop(true)
    this.music.play()

    let overText = this.add.text(0, 0,
      'GAME OVER',
      {
        font: '97px arcade',
        fill: '#fff'
      })

    let scoreText = this.add.text(0, 0,
      'Score ' + this.score,
      {
        font: '72px arcade',
        fill: '#009688'
      })

    let menuText = this.add.text(0, 0, 'RESTART', {
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
      this.add.zone(this.sys.game.config.width / 2, this.sys.game.config.height / 3, this.sys.game.config.width, this.sys.game.config.height)
    )
    Phaser.Display.Align.In.Center(
      scoreText,
      this.add.zone(this.sys.game.config.width / 2, this.sys.game.config.height / 2, this.sys.game.config.width, this.sys.game.config.height)
    )
    Phaser.Display.Align.In.Center(
      menuText,
      this.add.zone(this.sys.game.config.width / 2, this.sys.game.config.height - menuText.displayHeight, this.sys.game.config.width, this.sys.game.config.height)
    )
  }

  startGame () {
    location.reload()
  }
}
