import Phaser from 'phaser'
// GameObjects/sprites
import Player from '../objects/Player'
import Coin from '../objects/Coin'
import Enemy from '../objects/Enemy'

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
    this.createPlayer()

    this.coins = this.physics.add.group()
    this.coins.defaults.setAllowGravity = false // coins in the air
    this.enemies = this.physics.add.group({ runChildUpdate: true }) // runChildUpdate -> foreach enemy.update()

    this.convertObjects()

    this.registry.set('coins_max', this.coins.getLength()) // count coins in level
    this.events.emit('coinChange') // update UI

    // collisions
    this.physics.add.collider(this.enemies, this.WorldLayer)
    this.physics.add.collider(this.player, this.WorldLayer)
    this.physics.add.collider(this.enemy, this.WorldLayer)
    // this.physics.overlap(this, this.coins, (player, coin) => { player.pickup(player, coin) })
    // this.physics.add.collider(this.enemy, this.enemies, (player, enemy) => { player.hit(player, enemy) })
    this.physics.add.collider(this.player, this.enemy, (player, enemy) => { player.hit(player, enemy) })
    this.physics.add.overlap(this.player, this.coins, (player, coin) => { coin.pickup() })
  }

  update (time, delta) {
    this.player.update(time, delta)

    this.enemy.update(time, delta)

    // TODO update enemies

    // level complete condition
    if (this.player.alive) {
      let coinsCurrent = this.registry.get('coins_current')
      let coinsMax = this.registry.get('coins_max')
      if (coinsCurrent >= coinsMax) {
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
                callback: () => { this.goToNextLevel() },
                callbackScope: this
              })
          },
          callbackScope: this
        })
      }
    }
  }

  convertObjects () {
    const objectsLayer = this.map.getObjectLayer('Objects')

    objectsLayer.objects.forEach(
      (object) => {
        // coins
        if (object.type === 'coin') {
          let coin = new Coin({
            scene: this,
            x: object.x + 8,
            y: object.y - 8
          })
          this.coins.add(coin)
        }
        // // group enemies FIXME: update()..
        // if (object.type === 'enemy') {
        //   let enemy = new Enemy({
        //     scene: this,
        //     x: object.x + 8,
        //     y: object.y - 8
        //   })
        //   this.enemies.add(enemy)
        // }
        // enemie 1
        if (object.name === 'Enemy Point') {
          this.enemy = new Enemy({
            scene: this,
            x: object.x + 8,
            y: object.y - 16
          })
        }
      })
  }

  createPlayer () {
    const spawnPoint = this.map.findObject('Objects', obj => obj.name === 'Spawn Point')

    // create a new instance of the player class at the currently loaded spawnpoint
    this.player = new Player({
      scene: this,
      x: spawnPoint.x,
      y: spawnPoint.y
    })

    // smooth follow
    this.camera.startFollow(this.player, true, 0.05, 0.05)
    this.camera.followOffset.set(0, 50)
  }

  goToNextLevel () {
    this.scene.stop().start('LevelBScene')
  }

  createLevel () {
    this.add.image(0, 0, 'bg').setOrigin(0)

    this.map = this.make.tilemap({ key: 'map' })
    const tileset = this.map.addTilesetImage('RobotTileset', 'tiles')
    this.BackgroundLayer = this.map.createStaticLayer('Background', tileset, 0, 0) // layer index, tileset, x, y
    this.WorldLayer = this.map.createStaticLayer('World', tileset, 0, 0) // layer index, tileset, x, y

    // collision
    this.WorldLayer.setCollisionByProperty({ collides: true })

    // show collides tilesets
    // this.showDebugPhysics()

    // Phaser supports multiple cameras, but you can access the default camera like this:
    this.camera = this.cameras.main
    this.camera.zoom = 1.61803

    //  constraint camera
    this.camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels)
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
