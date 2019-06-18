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

    this.lives = this.add.group()
    this.printLives()

    this.levelName = this.add.text(0, 0, `${this.registry.get('level')}`, {
      font: '28px arcade',
      fill: '#fff'
    })
    this.levelName.setPosition(this.sys.game.config.width / 2 - (this.levelName.displayWidth / 2), 0 + marginY)

    // events levelA
    const levelAScene = this.scene.get('LevelAScene')
    levelAScene.events.on('coinChange', this.updateCoins, this)
    levelAScene.events.on('livesChange', this.updateLives, this)
    levelAScene.events.on('gameOver', this.gameOver, this)
    levelAScene.events.on('gameComplete', () => { this.levelComplete() }, this)
    levelAScene.events.on('levelChange', this.updateLevel, this)

    // events levelB
    const levelBScene = this.scene.get('LevelBScene')
    levelBScene.events.on('levelChange', this.updateLevel, this)
    levelBScene.events.on('coinChange', this.updateCoins, this)
    levelBScene.events.on('livesChange', this.updateLives, this)
    levelBScene.events.on('gameOver', this.gameOver, this)
    levelBScene.events.on('gameComplete', () => { this.levelComplete() }, this)
  }

  printLives () {
    this.lives.clear()
    let lives = this.registry.get('lives_current')
    for (let index = 0; index < lives; index++) {
      this.lives.create(0, 0, 'heart')
    }
    Phaser.Actions.SetXY(this.lives.getChildren(), this.sys.game.config.width - this.coins.displayWidth, 36, 20)
    Phaser.Actions.SetScale(this.lives.getChildren(), 2, 2)
  }

  updateCoins () {
    this.coins.setText(`Coins: ${this.registry.get('coins_current')} / ${this.registry.get('coins_max')}`)
  }

  updateLives () {
    this.printLives()
    // this.lives.setText(`Lives: ${this.registry.get('lives_current')} / ${this.registry.get('lives_max')}`)
  }

  updateLevel () {
    this.levelName.setText(`${this.registry.get('level')}`)
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
