
class MainScene extends Phaser.Scene {
    constructor() {
        super({
            key: "MainScene"
        });
    }

    preload() {
        this.load.image('button', './assets/Button.png');
    }

    create() {
        var startButton = this.add.sprite(400, 300, 'button').setInteractive();
        var text = this.add.text(400, 300, "Start Game", { fontSize: 28, color: '#fff'});
        text.setOrigin(0.5);


        startButton.on('pointerover', function (event, gameObjects) {

            startButton.setTint(0xff0000);
            text.setTint(0xff0000);
        });

        startButton.on('pointerout', function (event, gameObjects) {

            startButton.clearTint();
            text.clearTint();
        });

        startButton.on('pointerup', function (event, gameObjects) {

            this.scene.scene.start("ThirdScene");
        });

    }


    update(delta) {

        


    }


}