import Phaser from 'phaser'

class Key extends Phaser.GameObjects.Sprite {
  constructor (config) {
    super(config.scene, config.x, config.y, 'key')
    config.scene.physics.world.enable(this)
    this.scene = config.scene
    this.body.setImmovable(true)
    this.body.allowGravity = false

    // sound
    this.sound = this.scene.sound.add('key')
    this.sound.setVolume(0.4)

    // floating animation
    this.tween = this.scene.tweens.add({
      targets: this,
      x: this.x,
      y: this.y + 4,
      ease: 'Linear', // 'Cubic', 'Elastic', 'Bounce', 'Back'
      duration: 1000,
      repeat: -1, // -1: infinity
      yoyo: true
    })
    this.tween.play()

    // particles
    this.particles = this.scene.add.particles('random')
    this.emitter = this.particles.createEmitter({ on: false, duration: 1000 })
    this.emitter.setPosition(this.x, this.y)
    this.emitter.setSpeed(64)
    this.scene.add.existing(this) // required
  }

  take (player, key) {
    this.emitter.explode(60, player.x, player.y) // particles
    this.sound.play()
    this.tween.stop()
    this.scene.nextLevel()
    this.scene.time.addEvent({ delay: 500, callback: this.destroy(), callbackScope: this })
  }
}

export default Key
