/* global Phaser:true */

import Constants from '../utils/Constants'

// images

// ui images
const settingsButtonImg = './img/ui/settings.png'
const startImg = './img/ui/start.png'
const fullscreenButtonImg = './img/ui/fullscreen.png'
const backButtonImg = './img/ui/back.png'
const musicButtonsImg = './img/ui/musicButtons.png'
const scoresImg = './img/ui/scores.png'

// audio

class PreloadScene extends Phaser.Scene {
  constructor (test) {
    super({
      key: 'PreloadScene'
    })
  }
  init (data) {
    console.debug('PreloadScene: init()')
    Constants.IS_MOBILE = this.isMobile()
  }
  preload () {
    this.loadUiElements()

    this.preloadTilesets()
  }

  isMobile () {
    return this.sys.game.device.os.iPhone || this.sys.game.device.os.android || this.sys.game.device.os.iPad ||
    this.sys.game.device.os.windowsPhone
  }

  addProgress () {
    const rect = this.add.graphics()
    rect.fillRect(0, Constants.HEIGHT / 2, Constants.WIDTH, 60)
    rect.fillStyle(0x55ffff, 1)

    const progress = this.add.graphics()
    // Register a load progress event to show a load bar
    this.load.on('progress', (value) => {
      progress.clear()
      progress.fillStyle(0xffffff, 0.5)
      progress.fillRect(0, Constants.HEIGHT / 2, Constants.WIDTH * value, 60)
    })

    // Register a load complete event to launch the title screen when all files are loaded
    this.load.on('complete', () => {
      progress.destroy()
    })

    this.authorText = this.add.text(Constants.WIDTH / 2, Constants.HEIGHT / 2, 'LOADING...', {
      font: '28px minecraft',
      fill: '#3498DB'
    })
  }

  loadUiElements () {
    // load ui
    this.load.image('settings', settingsButtonImg)
    this.load.image('start', startImg)
    this.load.image('fullscreen', fullscreenButtonImg)
    this.load.image('back', backButtonImg)
    this.load.image('scores', scoresImg)
    this.load.spritesheet('music', musicButtonsImg, { frameWidth: 48, frameHeight: 48 })

    // if (Constants.IS_MOBILE) {
    //   this.loadControllers()
    // }
  }

  preloadTilesets () {
    this.load.image('tiles', './img/tilesets/16x16RobotTileset.v1.png')
    this.load.tilemapTiledJSON('map', './img/tilesets/projecte_robot.json')

    // player
    this.load.spritesheet('player', './img/tilesets/player_idle.png', { frameWidth: 16, frameHeight: 32 })
  }

  create () {
    console.log('PreloadScene: created()')
    this.scene.start('LevelAScene')
    // this.scene.start('MenuScene')
  }
}

export default PreloadScene
