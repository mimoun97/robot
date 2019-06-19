import Phaser from 'phaser'

class Player extends Phaser.GameObjects.Sprite {
  constructor (config) {
    super(config.scene, config.x, config.y, 'player')
    config.scene.physics.world.enable(this)
    // this.body.setCollideWorldBounds(true) // FIXME: dont work well with tilemap
    this.scene = config.scene
    this.body.setSize(16, 26, true).setOffset(0, 6) // good collision
    this.body.setDrag(8, 8)
    this.body.setBounce(0.5, 0.5)
    this.body.gravity.y = 200
    this.alive = true
    this.speed = 150
    this.jumpSpeed = 800
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
      frameRate: 16,
      repeat: -1
    })

    this.scene.anims.create({
      key: 'player_idle',
      frames: this.scene.anims.generateFrameNames('player', { start: 8, end: 15 }),
      frameRate: 8,
      repeat: -1
    })

    // collision coins and enemies
    this.scene.physics.overlap(this, this.scene.coins, this.pickup)
    this.scene.physics.collide(this, this.scene.enemies, this.hit)

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

      this.playerMovement()
    }
  }

  playerMovement () {
    let numberJumps = 0
    if (this.cursors.left.isDown) {
      this.body.setVelocityX(-this.speed)
      this.setFlipX(true)
      this.anims.play('player_walk', true)
    } else if (this.cursors.right.isDown) {
      this.body.setVelocityX(this.speed)
      this.setFlipX(false)
      this.anims.play('player_walk', true)
    } else {
      this.body.setVelocityX(0)
      this.anims.play('player_idle', true)
      numberJumps = 0
    }

    if (this.body.velocity === 0) { this.anims.play('player_idle') }

    if (Phaser.Input.Keyboard.JustDown(this.cursors.up) && this.body.onFloor() && numberJumps < 1) {
      this.body.setVelocityY(-this.jumpSpeed)
      // this.jumpSound.play()
      numberJumps++
    }
  }

  hit (player, enemy) {
    enemy.die()
    this.setTint(0xe20408)
    this.scene.time.addEvent({ delay: 1000, callback: this.normalize, callbackScope: this })
    let lives = this.scene.registry.get('lives_current')
    this.scene.registry.set('lives_current', lives - 1)
    this.scene.events.emit('livesChange')
  }

  pickup (player, coin) {
    coin.pickup()
  }
  normalize () {
    if (this.alive) {
      this.setTint(0xffffff)
    }
  }
}

export default Player
