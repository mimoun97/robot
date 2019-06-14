class Player extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, 'player');
    config.scene.physics.world.enable(this);
    this.scene = config.scene;
    this.body.setDrag(8, 8);
    this.body.setBounce(.5, .5);
    this.body.setMass(100)
    this.alive = true;
    //   this.damaged = false;
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    //   this.canLoad = true;  //property controls whether the level can restart so that it can only be called once

    //   this.noMagicSound = this.scene.sound.add('outOfMagicSFX');
    //   this.noMagicSound.setVolume(.4);

    //   this.hurtSound = this.scene.sound.add('playerDamageSFX');
    //   this.hurtSound.setVolume(.4);

    //   this.deathSound = this.scene.sound.add('playerDeathSFX');
    //   this.deathSound.setVolume(.4);

    //sync crosshair position with pointer
    //   this.scene.input.on('pointermove', function (pointer) {
    //     let mouse = pointer
    //     this.scene.crosshair.setPosition(mouse.x + this.scene.cameras.main.scrollX, mouse.y + this.scene.cameras.main.scrollY);
    //   }, this);

    //create a new instance of fireball class when pointer is clicked and add it to player attack group for collision callbacks
    //   this.scene.input.on('pointerdown', function (pointer) {
    //     let magic = this.scene.registry.get('magic_current');
    //     if (magic > 0) {
    //       let fireball = this.scene.playerAttack.get();
    //       if (fireball)
    //       {
    //           fireball.fire(this.x, this.y);

    //       }
    //       this.scene.registry.set('magic_current', magic - 1);
    //       this.scene.events.emit('magicChange'); //tell the scene the magic has changed so the HUD is updated
    //     } else {
    //       this.noMagicSound.play();
    //     }
    //   }, this);

    // Create the animations we need from the player spritesheet
    this.scene.anims.create({
      key: 'player_walk',
      frames: this.scene.anims.generateFrameNames('player', { frames: [0, 7] }),
      frameRate: 8,
      repeat: -1
    })

    this.scene.anims.create({
      key: 'player_idle',
      frames: this.scene.anims.generateFrameNames('player', { frames: [8, 15] }),
      frameRate: 8,
      repeat: -1
    })

    this.scene.add.existing(this);
  }

  update(time, delta) {
    if (this.alive) {
      let healthCurrent = this.scene.registry.get('player_lifes')
      if (healthCurrent <= 0) {
        this.alive = false
        this.setTint(0x2a0503)
        this.deathSound.play()
        this.scene.time.addEvent({ delay: 1000, callback: this.gameOver, callbackScope: this })
      }

      this.scene.physics.overlap(this, this.scene.pickups, this.pickup) //call pickup method when player overlaps pickup objects

      //movement
      if (!this.damaged) {
        this.body.setVelocity(0);
      }

      this.playerMovement()
    }
  }

  playerMovement() {
    if (this.cursors.left.isDown) {
      this.body.setVelocityX(-160)
      this.setFlipX(true)
      this.anims.play('player_walk', true)
    }
    else if (this.cursors.right.isDown) {
      this.body.setVelocityX(160);
      this.setFlipX(false)
      this.anims.play('player_walk', true)
    }
    else {
      this.body.setVelocityX(0)
      this.anims.play('player_idle')
    }

    if (this.cursors.up.isDown && true) {
      this.body.setVelocityY(-120)
      this.anims.play('player_idle')
      // this.jumpSound.play()
    }
  }

  pickup(player, object) {
    object.pickup();  //call the pickup objects method
  }
}

export default Player