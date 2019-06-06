<template>
  <div>
    <div style="font-family:arcade; position:absolute; left:-1000px; visibility:hidden;">.</div>
    <div id="game"></div>
  </div>
</template>
<script>
import Phaser from 'phaser'
import Constants from '../js/utils/Constants'

import PreloadScene from '../js/scenes/PreloadScene'
import MenuScene from '../js/scenes/MenuScene'
import LevelAScene from '../js/scenes/LevelAScene'
import LevelBScene from '../js/scenes/LevelBScene'
import CreditsScene from '../js/scenes/CreditsScene'
import ScoresScene from '../js/scenes/ScoresScene'

export default {
  name: 'Game',
  mounted () {
    // phaser 3.0 => phaser
    let config = {
      title: Constants.TITLE,
      type: Phaser.AUTO,
      width: Constants.WIDTH,
      height: Constants.HEIGHT,
      backgroundColor: Constants.BG_COLOR,
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: 'game',
        width: window.innerWidth * window.devicePixelRatio,
        height: window.innerHeight * window.devicePixelRatio
      },
      scene: [
        PreloadScene,
        MenuScene,
        LevelAScene,
        LevelBScene,
        CreditsScene,
        ScoresScene
      ],
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 200 }
        }
      },
      loader: {
        baseURL: 'assets'
      }
    }

    // eslint-disable-next-line
    const game = new Phaser.Game(config);
    console.log(game)
    Constants.WIDTH = game.config.width
    Constants.HEIGHT = game.config.height

    fetch('assets/img/ui/back.png')
      .then(function (response) {
        console.log(response)
      })
  }
}
</script>
<style>
@font-face {
  font-family: "arcade";
  src: url("../assets/fonts/ARCADECLASSIC.TTF");
  font-weight: 400;
  font-weight: normal;
}
</style>
