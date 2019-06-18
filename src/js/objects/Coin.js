import Phaser from 'phaser'

class Coin extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, 'coin')
        config.scene.physics.world.enable(this)
        this.scene = config.scene
        //this.sound = this.scene.sound.add('coinSFX')
        //this.sound.setVolume(.4)

        this.body.setImmovable()

        // add animations
        this.scene.anims.create({
            key: 'coin',
            frames: this.scene.anims.generateFrameNames('coin', { start: 0, end: 6 }),
            frameRate: 8,
            repeat: -1
        })
        this.play('coin') // play animation
        this.scene.add.existing(this)
    }

    pickup() {
        // this.sound.play()
        let coins = this.scene.registry.get('coins_current')
        this.scene.registry.set('coins_current', coins + 1)
        this.scene.events.emit('coinChange')
        this.destroy() //destroy coin
    }

}

export default Coin
