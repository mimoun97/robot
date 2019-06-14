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
    level.events.on('coinChange', this.updateCoins, this) // watch the level to see if the coin count has changed. Event emitted by coin class.
    level.events.on('livesChange', this.updateLives, this) // watch the level to see if the coin health has changed. Event emitted by player and meat class.

    level.events.on('gameOver', this.gameOver, this) // watch for Game Over
  }

  updateCoins () {
    this.coins.setText(`Coins: ${this.registry.get('coins_current')} / ${this.registry.get('coins_max')}`)
  }

  updateLives () {
    this.lives.setText(`Lives: ${this.registry.get('lives_current')} / ${this.registry.get('lives_max')}`)
  }

  gameOver () {
    this.health.destroy()
    this.magic.destroy()
    this.coins.destroy()
  }
}

export default UIScene
