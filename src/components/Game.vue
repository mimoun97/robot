<template>
  <div>
    <div style="font-family:arcade; position:absolute; left:-1000px; visibility:hidden;">.</div>
    <div id="game"></div>
  </div>
</template>
<script>
/* eslint-disable */
import Phaser from "phaser";

import Loading from "../js/scenes/Loading";
import Menu from "../js/scenes/Menu";

//images
import logoImg from "../assets/logo.png";
import okImg from "../assets/ok.png";
// audio

export default {
  name: "Game",
  mounted() {
    // phaser 3.0 => phaser
    let config = {
      type: Phaser.AUTO,
      width: 800,
      height: 400,
      backgroundColor: '#41b8a1',
      scene: [ Loading, Menu ],// LevelA, LevelB ],
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 200 }
        }
      },
      title: "ROBOT"
    };

    // eslint-disable-next-line
    new Phaser.Game(config);
  }
};
</script>
<style>
@font-face {
  font-family: "arcade";
  src: url("../assets/fonts/ARCADECLASSIC.TTF");
  font-weight: 400;
  font-weight: normal;
}
</style>
