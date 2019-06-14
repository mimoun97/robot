import Phaser from 'phaser'
import Player from '../objects/Player'

class LevelAScene extends Phaser.Scene {
  constructor () {
    super({
      key: 'LevelAScene'
    })
  }

  create () {
    this.cameras.main.backgroundColor.setTo(0, 0, 0)

    this.createLevel()

    this.createPlayer()

    this.createEnemy()

    this.createCoins()

    this.addCollides()
  }

  update (time, delta) {
    this.player.update(time, delta)
  }

  addCollides () {
    this.physics.add.collider(this.enemy, this.player)

    this.physics.add.collider(this.enemy, this.WorldLayer)

    this.physics.add.collider(this.player, this.WorldLayer)

    this.physics.add.collider(this.coins, this.WorldLayer)
  }

  createEnemy () {
    const enemyPoint = this.map.findObject('Objects', obj => obj.name === 'Enemy Point')

    this.enemy = this.physics.add.sprite(enemyPoint.x, enemyPoint.y, 'enemy')
  }

  createCoins () {
    this.coins = this.physics.add.group()
    console.log(this.coins)
    this.coins.defaults.setAllowGravity = false

    const objectsLayer = this.map.getObjectLayer('Objects')

    this.anims.create({
      key: 'coin',
      frames: this.anims.generateFrameNames('coin', { frames: [0, 6] }),
      frameRate: 4,
      repeat: -1
    })

    objectsLayer.objects.forEach(
      (object) => {
        if (object.type === 'coin') {
          // let coins = new Coins({
          //   scene: this,
          //   x: object.x + 8,
          //   y: object.y - 8,
          //   number: coinNum
          // })
          let coin = this.physics.add.sprite(object.x, object.y, 'coin')
          coin.play('coin')

          this.coins.add(coin)
        }
      })

    // this.coin = this.add.sprite(enemyPoint.x + 200, enemyPoint.y, 'coin').play('coin')

    // this.coin.anims.play('coin', true)
    // this.anims.play('coin', true)
  }

  createPlayer () {
    const spawnPoint = this.map.findObject('Objects', obj => obj.name === 'Spawn Point')

    // create a new instance of the player class at the currently loaded spawnpoint
    this.player = new Player({
      scene: this,
      x: spawnPoint.x,
      y: spawnPoint.y
    }).play('player_idle')

    this.camera.startFollow(this.player)
  }

  startGame () {
    this.scene.stop().start('LevelBScene')
    // this.scene.start('LevelBScene')
  }

  createLevel () {
    console.log('sadsadsa')
    // Load a map from a 2D array of tile indices
    // When loading a CSV map, make sure to specify the tileWidth and tileHeight!
    this.map = this.make.tilemap({ key: 'map' })
    const tileset = this.map.addTilesetImage('RobotTileset', 'tiles')
    this.WorldLayer = this.map.createStaticLayer('World', tileset, 0, 0) // layer index, tileset, x, y
    this.BackgroundLayer = this.map.createStaticLayer('Background', tileset, 0, 0) // layer index, tileset, x, y

    // collision
    this.WorldLayer.setCollisionByProperty({ collides: true })

    // const debugGraphics = this.add.graphics().setAlpha(0.75)
    // this.WorldLayer.renderDebug(debugGraphics, {
    //   tileColor: null, // Color of non-colliding tiles
    //   collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
    //   faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    // })

    // Phaser supports multiple cameras, but you can access the default camera like this:
    this.camera = this.cameras.main
    this.camera.zoom = 1.61803

    // Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
    this.camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels)
  }

  addCoins () {
    // group coins getLength()

  }
}

export default LevelAScene
