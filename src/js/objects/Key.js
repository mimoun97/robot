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
    this.scene.add.existing(this)
  }

  take () {
    // this.sound.play()
    this.scene.nextLevel()
    this.destroy()
  }
}

export default Key
