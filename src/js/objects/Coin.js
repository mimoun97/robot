import Phaser from 'phaser'

class Coin extends Phaser.GameObjects.Sprite {
  constructor (config) {
    super(config.scene, config.x, config.y, 'coin')
    config.scene.physics.world.enable(this)
    this.scene = config.scene
    this.body.setImmovable(true)

    // sound
    this.sound = this.scene.sound.add('coin')
    this.sound.setVolume(0.4)

    // add animations
    this.scene.anims.create({
      key: 'coin',
      frames: this.scene.anims.generateFrameNames('coin', { start: 0, end: 6 }),
      frameRate: 8,
      repeat: -1
    })
    this.play('coin') // play animation
    // floating animation
    this.tween = this.scene.tweens.add({
      targets: this,
      x: this.x,
      y: this.y - 4,
      ease: 'Linear', // 'Cubic', 'Elastic', 'Bounce', 'Back'
      duration: 500,
      repeat: -1, // -1: infinity
      yoyo: true
    })
    this.tween.play()
    this.scene.add.existing(this)
  }

  pickup () {
    this.sound.play()
    this.scene.tweens.add({
      targets: this,
      y: this.y - 100,
      scaleX: 0,
      ease: 'Linear',
      duration: 160,
      repeat: 0,
      on: false,
      onComplete: () => { this.destroy() }
    })
    let coins = this.scene.registry.get('coins_current')
    this.scene.registry.set('coins_current', coins + 1)
    this.scene.events.emit('coinChange')
  }
}

export default Coin
