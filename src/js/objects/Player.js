import Phaser from 'phaser'

class Player extends Phaser.GameObjects.Sprite {
  constructor (config) {
    super(config.scene, config.x, config.y, 'player')
    config.scene.physics.world.enable(this)
    // this.body.setCollideWorldBounds(true) // FIXME: dont work well with tilemap
    this.scene = config.scene
    this.body.setDrag(8, 8)
    this.body.setBounce(0.5, 0.5)
    this.body.gravity.y = 600
    this.alive = true
    this.cursors = this.scene.input.keyboard.createCursorKeys()

    // TODO sounds
    //   this.jumpSound = this.scene.sound.add('jump')
    //   this.jumpSound.setVolume(.4)

    //   this.hurtSound = this.scene.sound.add('hurt')
    //   this.hurtSound.setVolume(.4)

    //   this.deathSound = this.scene.sound.add('death')
    //   this.deathSound.setVolume(.4)

    // Create the animations we need from the player spritesheet
    this.scene.anims.create({
      key: 'player_walk',
      frames: this.scene.anims.generateFrameNames('player', { start: 0, end: 7 }),
      frameRate: 8,
      repeat: -1
    })

    this.scene.anims.create({
      key: 'player_idle',
      frames: this.scene.anims.generateFrameNames('player', { start: 8, end: 15 }),
      frameRate: 8,
      repeat: -1
    })

    // add player to scene  
    this.scene.add.existing(this)

    this.anims.play('player_idle', true)
  }

  update (time, delta) {
    if (this.alive) {
      let healthCurrent = this.scene.registry.get('player_lifes')
      if (healthCurrent <= 0) {
        this.alive = false
        this.setTint(0x2a0503)
        this.deathSound.play()
        this.scene.time.addEvent({ delay: 1000, callback: this.gameOver, callbackScope: this })
      }

      this.scene.physics.overlap(this, this.scene.coins, this.pickup)

      // movement
      if (!this.damaged) {
        this.body.setVelocity(0)
      }

      this.playerMovement()
    }
  }

  playerMovement () {
    let numberJumps = 0
    if (this.cursors.left.isDown) {
      this.body.setVelocityX(-100)
      this.setFlipX(true)
      this.anims.play('player_walk', true)
    } else if (this.cursors.right.isDown) {
      this.body.setVelocityX(100)
      this.setFlipX(false)
      this.anims.play('player_walk', true)
    } else {
      this.body.setVelocityX(0)
      this.anims.play('player_idle', true)
      numberJumps=0
    }

    if (this.body.velocity == 0) {this.anims.play('player_idle')}

    if (Phaser.Input.Keyboard.JustDown(this.cursors.up) && this.body.onFloor() && numberJumps < 1) {
      this.body.setVelocityY(-2000)
      // this.jumpSound.play()
      numberJumps++
    }
  }

  pickup (player, object) {
    object.pickup() // method coin.pickup()
  }
}

export default Player
