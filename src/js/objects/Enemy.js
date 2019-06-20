import Phaser from 'phaser'

class Enemy extends Phaser.GameObjects.Sprite {
  constructor (config) {
    super(config.scene, config.x, config.y, 'enemy')
    config.scene.physics.world.enable(this)
    this.scene = config.scene
    this.body.setDrag(8, 8)
    this.body.setBounce(0.5, 0.5)
    this.alive = true

    this.deathSound = this.scene.sound.add('enemyDeath')
    this.deathSound.setVolume(0.6)

    // animations
    this.scene.anims.create({
      key: 'enemy_idle',
      frames: this.scene.anims.generateFrameNames('enemy', { start: 0, end: 7 }),
      frameRate: 8,
      repeat: -1
    })

    this.scene.anims.create({
      key: 'enemy_walk',
      frames: this.scene.anims.generateFrameNames('enemy', { start: 8, end: 15 }),
      frameRate: 8,
      repeat: -1
    })

    this.play('enemy_idle')

    this.scene.add.existing(this)

    this.distance = 100
    this.speed = 60
    this.originalX = this.x
    this.fminX = this.originalX - this.distance // 0 + 10 = 10
    this.fmaxX = this.originalX + this.distance // 0 - 10 = -10
    this.direction = -1
    this.targetMin = new Phaser.Math.Vector2(this.fminX, this.y)
    this.targetMax = new Phaser.Math.Vector2(this.fmaxX, this.y)

    // move player to x or y
    let decision = Phaser.Math.RND.integerInRange(1, 2)
    this.scene.physics.moveToObject(this, decision === 1 ? this.targetMin : this.targetMax, this.speed)
  }

  update (time, delta) {
    if (this.alive) {
      // movement
      this.anims.play('enemy_walk', true)
      if (this.x >= this.fmaxX) {
        this.setFlipX(true)
        this.scene.physics.moveToObject(this, this.targetMin, this.speed)
      } else if (this.x <= this.fminX) {
        this.setFlipX(false)
        this.scene.physics.moveToObject(this, this.targetMax, this.speed)
      }
    }
  }

  die () {
    this.deathSound.play()
    this.alive = false
    this.destroy()
  }
}

export default Enemy
