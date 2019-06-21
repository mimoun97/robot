import Phaser from 'phaser'

import Constants from '../utils/Constants'
import Player from '../objects/Player'
import Key from '../objects/Key'
import Coin from '../objects/Coin'
import Enemy from '../objects/Enemy'

class LevelBScene extends Phaser.Scene {
  constructor (test) {
    super({
      key: 'LevelBScene'
    })
  }
  create () {
    this.cameras.main.backgroundColor.setTo('#000')
    this.registry.set('level', 'LEVEL B')
    this.events.emit('levelChange') // change level name

    this.coins = this.physics.add.group()
    this.coins.defaults.setAllowGravity = false // coins in the air
    this.enemies = this.add.group({ runChildUpdate: true })
    this.createLevel()
    this.convertObjects()

    // set coins previous level + this.level coins
    this.registry.set('coins_max', this.coins.getLength() + this.registry.get('coins_current')) // count coins in level
    this.events.emit('coinChange') // update UI

    // collisions
    this.physics.add.collider(this.enemies, this.WorldLayer)
    this.physics.add.collider(this.player, this.WorldLayer)
    this.physics.add.collider(this.key, this.WorldLayer)
    this.physics.add.overlap(this.player, this.enemies, (player, enemy) => { player.hit(player, enemy) })
    this.physics.add.overlap(this.player, this.coins, (player, coin) => { coin.pickup() })
    this.physics.add.overlap(this.player, this.key, (player, key) => { key.take(player, key) })

    // this.time.addEvent({
    //   delay: 500,
    //   callback: () => {
    //     this.cameras.main.fade(500, 16.5, 2.0, 1.2)
    //     this.scene.stop().start('CompleteScene')
    //     this.events.emit('gameComplete')
    //   },
    //   callbackScope: this
    // })
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
  }

  alignElements () {
    Phaser.Display.Align.In.Center(
      this.titleText,
      this.add.zone(this.sys.game.config.width / 2, this.sys.game.config.height / 2 - this.titleText.displayHeight / 2, Constants.WIDTH, Constants.HEIGHT)
    )
  }

  createLevel () {
    this.add.image(0, 0, 'bg').setOrigin(0)

    // load and play bg music
    // this.music = this.sound.add('LevelAMusic')
    // this.music.setLoop(true)
    // this.music.play()

    this.levelB = this.make.tilemap({ key: 'levelB' })
    const tileset = this.levelB.addTilesetImage('RobotTileset', 'tiles')
    this.BackgroundLayer = this.levelB.createStaticLayer('Background', tileset, 0, 0) // layer index, tileset, x, y
    this.WorldLayer = this.levelB.createStaticLayer('World', tileset, 0, 0) // layer index, tileset, x, y

    // collision
    this.WorldLayer.setCollisionByProperty({ collides: true })

    // show collides tilesets
    // this.showDebugPhysics()

    // Phaser supports multiple cameras, but you can access the default camera like this:
    this.camera = this.cameras.main
    this.camera.zoom = 1.61803

    //  constraint camera
    this.camera.setBounds(0, 0, this.levelB.widthInPixels, this.levelB.heightInPixels)
  }

  convertObjects () {
    const objectsLayer = this.levelB.getObjectLayer('Objects')

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

  showDebugPhysics () {
    const debugGraphics = this.add.graphics().setAlpha(0.75)
    this.WorldLayer.renderDebug(debugGraphics, {
      tileColor: null, // Color of non-colliding tiles
      collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
      faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    })
  }

  nextLevel () {
    this.player.alive = false
    this.player.body.setEnable(false)
    this.time.addEvent({
      delay: 500,
      callback: () => {
        this.cameras.main.fade(500, 16.5, 2.0, 1.2)
        this.events.emit('nextLevel')
        this.time.addEvent(
          {
            delay: 500,
            callback: () => { this.scene.stop().start('CompleteScene') },
            callbackScope: this
          })
      },
      callbackScope: this
    })
  }

  gameOver () {
    this.scene.get('LevelAScene').music.stop()
    this.scene.stop().start('GameOverScene')
  }
}

export default LevelBScene
