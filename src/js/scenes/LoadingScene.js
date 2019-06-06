/* eslint-disable */

export class Loading extends Phaser.Scene {

    constructor() {
        super({ key: 'UIScene' });
    }

    preload() {
        var progress = this.add.graphics();

        this.load.on("progress", function (value) {
            progress.clear();
            progress.fillStyle(0xffffff, 1);
            progress.fillRect(0, 270, 800 * value, 60);
        });

        this.load.on("complete", function () {
            progress.destroy();
        });

        // this.load.image("logo", logoImg);
        // this.load.image("ok", okImg);
    }

    create() {
        var logo = this.add.image(800 / 2, 400 / 2, "logo");
        console.log("created");

        this.cameras.main.backgroundColor.setTo(65, 184, 161);

        var text = this.add.text(800 / 2, 400 / 2, "ROBOT", {
            font: "96px arcade",
            fill: "#ffffff"
        });

        var authorText = this.add.text(800 / 2, 400 / 2, "By Mimoun1997", {
            font: "36px arcade",
            fill: "#eee"
        });

        this.level = this.physics.add.staticGroup();

        //var pic = this.add.image(0, 0, 'pic');
        //var block = this.add.image(0, 0, 'block');

        //  Center the picture in the game
        Phaser.Display.Align.In.Center(
            text,
            this.add.zone(800 / 2, 400 / 2 - 36, 800, 400)
        );
        Phaser.Display.Align.In.Center(
            authorText,
            this.add.zone(800 / 2 - 7, 400 / 2, 800, 400)
        );
    }
    update() { }

    // clickHandler(pointer, box) {
    //     //  Disable our box
    //     box.input.enabled = false;
    //     box.setVisible(false);

    //     //  Dispatch a Scene event
    //     this.events.emit('addScore');
    // }

}