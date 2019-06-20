import Phaser from 'phaser'

class Key extends Phaser.GameObjects.Sprite {
  constructor (config) {
    super(config.scene, config.x, config.y, 'key')
    config.scene.physics.world.enable(this)
    this.scene = config.scene
    // this.sound = this.scene.sound.add('key')
    // this.sound.setVolume(.4)
    this.body.setImmovable(true)
    this.body.allowGravity = false

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

    this.scene.add.existing(this)
  }

  take () {
    // this.sound.play()
    this.tween.stop()
    this.scene.nextLevel()
    this.destroy()
  }
}

export default Key
