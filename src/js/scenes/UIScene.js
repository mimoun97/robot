import Phaser from 'phaser'

class UIScene extends Phaser.Scene {
  constructor () {
    super({
      key: 'UIScene'
    })
  }

  create () {
    let marginY = 20
    let marginX = 20
    this.coins = this.add.text(0 + marginX, marginY, `Coins: ${this.registry.get('coins_current')} / ${this.registry.get('coins_max')}`, {
      font: '28px arcade',
      fill: '#fff'
    })

    this.lives = this.add.text(this.sys.game.config.width - this.coins.displayWidth - marginX, marginY, `Lives: ${this.registry.get('lives_current')} / ${this.registry.get('lives_max')}`, {
      font: '28px arcade',
      fill: '#fff'
    })

    const level = this.scene.get('LevelAScene')
    level.events.on('coinChange', this.updateCoins, this)
    level.events.on('livesChange', this.updateLives, this)

    level.events.on('gameOver', this.gameOver, this)
    level.events.on('gameComplete', () => { this.levelComplete() }, this)
  }

  updateCoins () {
    this.coins.setText(`Coins: ${this.registry.get('coins_current')} / ${this.registry.get('coins_max')}`)
  }

  updateLives () {
    this.lives.setText(`Lives: ${this.registry.get('lives_current')} / ${this.registry.get('lives_max')}`)
  }

  levelComplete () {
    this.lives.destroy()
    this.coins.destroy()
    this.scene.stop()
  }

  gameOver () {
    this.lives.destroy()
    this.coins.destroy()
    this.scene.stop()
  }
}

export default UIScene
