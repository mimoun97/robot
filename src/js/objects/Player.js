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

    // sounds
    this.jumpSound = this.scene.sound.add('jump')
    this.jumpSound.setVolume(0.2)
    this.deadSound = this.scene.sound.add('dead')
    this.deadSound.setVolume(0.4)
    this.damageSound = this.scene.sound.add('damage')
    this.damageSound.setVolume(0.4)

    // TODO particles
    this.dustParticles = this.scene.add.particles('dust')
    this.dust = this.dustParticles.createEmitter(
      {
        x: this.x,
        y: this.y,
        speedX: { min: -100, max: 100 },
        speedY: { min: -100, max: 100 },
        alpha: { min: 0, max: 1 },
        lifespan: 300,
        on: false, // dont start
        active: true
      })
    this.expParticles = this.scene.add.particles('exp')
    this.exp = this.expParticles.createEmitter(
      {
        x: this.x,
        y: this.y,
        speedX: { min: -150, max: 150 },
        speedY: { min: -150, max: 150 },
        alpha: { min: 0, max: 1 },
        lifespan: 200,
        on: false, // dont start
        active: true
      })

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
    // this.scene.physics.collide(this, this.scene.enemies, this.hit)

    // add player to scene
    this.scene.add.existing(this)

    this.anims.play('player_idle', true)
  }

  update (time, delta) {
    if (this.alive) {
      let livesCurrent = this.scene.registry.get('lives_current')
      if (livesCurrent <= 0) {
        this.alive = false
        this.setTint(0x2a0503)
        this.deadSound.play()
        this.scene.time.addEvent({ delay: 1000, callback: () => { this.scene.gameOver() }, callbackScope: this })
      }

      this.playerMovement()
    }
  }

  playerMovement () {
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
    }

    if (this.body.velocity === 0) { this.anims.play('player_idle') }

    if (Phaser.Input.Keyboard.JustDown(this.cursors.up) && this.body.onFloor()) {
      this.body.setVelocityY(-this.jumpSpeed)
      this.jumpSound.play()
      // particles
      this.dust.explode(15, this.x, this.y + 16)
      this.exp.explode(5, this.x, this.y + 16)
    }
  }

  hit (player, enemy) {
    this.setTint(0xe20408)
    this.damageSound.play()
    enemy.die()
    this.scene.time.addEvent({ delay: 1000, callback: this.normalize(), callbackScope: this })
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
