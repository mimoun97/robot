import Phaser from 'phaser'

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
    // debugger
    this.addProgressPlus() // loading bar
    this.loadUiElements() // buttons and ui images
    this.preloadImages() // images and spritesheets
    this.preloadSounds() // game sounds
    this.preloadMusic() // game musics
  }

  create () {
    this.input.setDefaultCursor('url(assets/img/ui/upLeft.cur), pointer')
    this.initRegistry()
    this.scene.start('MenuScene')
  }

  isMobile () {
    return this.sys.game.device.os.iPhone || this.sys.game.device.os.android || this.sys.game.device.os.iPad ||
    this.sys.game.device.os.windowsPhone
  }

  addProgressPlus () {
    // create a background and prepare loading bar
    this.cameras.main.setBackgroundColor('#021f28')
    this.fullBar = this.add.graphics()
    this.fullBar.fillStyle(0xbfc0c1, 1) // bfc0c1 0x3494d9
    this.fullBar.fillRect((this.cameras.main.width / 4) - 2, (this.cameras.main.height / 2) - 18, (this.cameras.main.width / 2) + 4, 20)
    this.progress = this.add.graphics()

    // pass loading progress as value to loading bar and redraw as files load
    this.load.on('progress', function (value) {
      this.progress.clear()
      this.progress.fillStyle(0xfff6d3, 1)
      this.progress.fillRect((this.cameras.main.width / 4), (this.cameras.main.height / 2) - 16, (this.cameras.main.width / 2) * value, 16)
    }, this)

    // cleanup our graphics on complete
    this.load.on('complete', function () {
      this.progress.destroy()
      this.fullBar.destroy()
    }, this)
  }

  loadUiElements () {
    // load ui
    this.load.image('settings', settingsButtonImg)
    this.load.image('start', startImg)
    this.load.image('fullscreen', fullscreenButtonImg)
    this.load.image('back', backButtonImg)
    this.load.image('scores', scoresImg)
    this.load.spritesheet('music', musicButtonsImg, { frameWidth: 48, frameHeight: 48 })
    this.load.image('heart', './img/ui/heart.png') // heart
    this.load.image('key', './img/key.png') // key
    this.load.image('info', './img/ui/information.png') // key

    // TODO mobile controllers
    // if (Constants.IS_MOBILE) {
    //   this.loadControllers()
    // }
  }

  preloadImages () {
    this.load.image('bg', 'img/bg.jpg')
    this.load.image('logo', 'img/logo.png')
    this.load.image('tiles', './img/tilesets/16x16RobotTileset.v1.png')
    this.load.tilemapTiledJSON('levelA', './img/tilesets/projecte_robot.json')
    this.load.tilemapTiledJSON('levelB', './img/tilesets/levelB.json')
    this.load.spritesheet('player', './img/tilesets/player.png', { frameWidth: 16, frameHeight: 32 })
    this.load.spritesheet('enemy', './img/tilesets/enemy.png', { frameWidth: 16, frameHeight: 32 })
    this.load.spritesheet('coin', './img/coins.png', { frameWidth: 16, frameHeight: 16 })
    this.load.image('dust', 'img/dust.png')
    this.load.image('exp', 'img/exp.png')
    this.load.image('random', 'img/random.png')
  }

  initRegistry () {
    // registry es accessible per totes les scenes, get i set
    this.registry.set('level', undefined)
    this.registry.set('lives_max', 3)
    this.registry.set('lives_current', this.registry.get('lives_max'))
    this.registry.set('coins_max', NaN) // se contaran les monedes al iniciar el nivell
    this.registry.set('coins_current', 0)
    this.registry.set('score', 0)
    this.registry.set('high_score', localStorage.getItem('high_score') || 0)
  }

  preloadSounds () {
    // load audios
    this.load.audio('coin', ['./sounds/coin.wav', './sounds/coin.mp3'])
    this.load.audio('dead', ['./sounds/dead.wav', './sounds/dead.mp3'])
    this.load.audio('dust', ['./sounds/dust.wav', './sounds/dust.mp3'])
    this.load.audio('jump', ['./sounds/jump.wav', './sounds/jump.mp3'])
    this.load.audio('click', './sounds/click.wav')
    this.load.audio('enemyDeath', './sounds/enemyDeath.wav')
    this.load.audio('damage', './sounds/damage.wav')
    this.load.audio('key', './sounds/key.wav')
  }

  preloadMusic () {
    this.load.audio('MenuMusic', './music/Menu.mp3')
    this.load.audio('LevelAMusic', './music/LevelA.mp3')
    this.load.audio('LevelBMusic', './music/LevelB.mp3')
    this.load.audio('GameOverMusic', './music/GameOver.mp3')
    this.load.audio('GameCompleteMusic', './music/Final.mp3')
  }
}

export default PreloadScene
