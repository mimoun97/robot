import Phaser from 'phaser'

// GameObjects/sprites
import Player from '../objects/Player'
import Coin from '../objects/Coin'
import Enemy from '../objects/Enemy'
import Key from '../objects/Key'

class LevelAScene extends Phaser.Scene {
  constructor () {
    super({
      key: 'LevelAScene'
    })
  }

  create () {
    this.registry.set('level', 'LEVEL A')
    this.events.emit('levelChange') // update ui level name

    this.createLevel()
    this.coins = this.physics.add.group()
    this.coins.defaults.setAllowGravity = false // coins in the air
    this.enemies = this.add.group({ runChildUpdate: true }) // runChildUpdate -> foreach enemy.update()
    this.convertObjects()

    // smooth follow
    this.camera.startFollow(this.player, true, 0.05, 0.05)
    this.camera.followOffset.set(0, 50)

    this.registry.set('coins_max', this.coins.getLength()) // count coins in level
    this.events.emit('coinChange') // update UI

    // collisions
    this.physics.add.collider(this.enemies, this.WorldLayer)
    this.physics.add.collider(this.player, this.WorldLayer)
    this.physics.add.collider(this.key, this.WorldLayer)
    this.physics.add.overlap(this.player, this.enemies, (player, enemy) => { player.hit(player, enemy) })
    this.physics.add.overlap(this.player, this.coins, (player, coin) => { coin.pickup() })
    this.physics.add.overlap(this.player, this.key, (player, key) => { key.take(player, key) })
  }

  update (time, delta) {
    this.player.update(time, delta)

    // level complete condition
    if (this.player.alive) {
      let coinsCurrent = this.registry.get('coins_current')
      let coinsMax = this.registry.get('coins_max')
      if (coinsCurrent >= coinsMax) {
        this.nextLevel()
      }
    }

    // lost condition
    if (this.player.alive) {
      let lives = this.registry.get('lives_current')
      if (lives <= 0) {
        this.player.body.setEnable(false)
        this.gameOver()
      }
    }
  }

  nextLevel () {
    this.player.alive = false
    this.player.body.setVelocity(0)
    this.time.addEvent({
      delay: 500,
      callback: () => {
        this.cameras.main.fade(500, 16.5, 2.0, 1.2)
        this.events.emit('nextLevel')
        this.time.addEvent(
          {
            delay: 500,
            callback: () => { this.scene.stop().start('LevelBScene') },
            callbackScope: this
          })
      },
      callbackScope: this
    })
  }

  convertObjects () {
    const objectsLayer = this.levelA.getObjectLayer('Objects')

    objectsLayer.objects.forEach(
      (object) => {
        // coins
        if (object.type === 'coin') {
          let coin = new Coin({
            scene: this,
            x: object.x + 8,
            y: object.y - 4
          })
          this.coins.add(coin)
        }
        // group enemies FIXME: dont work => update()..
        if (object.type === 'enemy') {
          let enemy = new Enemy({
            scene: this,
            x: object.x + 8,
            y: object.y - 8
          })
          this.enemies.add(enemy)
        }
        // key
        if (object.name === 'Key Point') {
          this.key = new Key({
            scene: this,
            x: object.x,
            y: object.y
          })
        }
        // player
        if (object.name === 'Spawn Point') {
          // create a new instance of the player class at the currently loaded spawnpoint
          this.player = new Player({
            scene: this,
            x: object.x,
            y: object.y
          })
        }
      })
  }

  createLevel () {
    this.add.image(0, 0, 'bg').setOrigin(0)

    // load and play bg music
    this.music = this.sound.add('LevelAMusic')
    this.music.setLoop(true)
    this.music.play()

    this.levelA = this.make.tilemap({ key: 'levelA' })
    const tileset = this.levelA.addTilesetImage('RobotTileset', 'tiles')
    this.BackgroundLayer = this.levelA.createStaticLayer('Background', tileset, 0, 0) // layer index, tileset, x, y
    this.WorldLayer = this.levelA.createStaticLayer('World', tileset, 0, 0) // layer index, tileset, x, y

    // collision
    this.WorldLayer.setCollisionByProperty({ collides: true })

    // show collides tilesets
    // this.showDebugPhysics()

    // Phaser supports multiple cameras, but you can access the default camera like this:
    this.camera = this.cameras.main
    this.camera.zoom = 1.61803

    //  constraint camera
    this.camera.setBounds(0, 0, this.levelA.widthInPixels, this.levelA.heightInPixels)
  }

  gameOver () {
    this.music.stop()
    this.scene.stop().start('GameOverScene')
  }

  showDebugPhysics () {
    const debugGraphics = this.add.graphics().setAlpha(0.75)
    this.WorldLayer.renderDebug(debugGraphics, {
      tileColor: null, // Color of non-colliding tiles
      collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
      faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    })
  }
}

export default LevelAScene
