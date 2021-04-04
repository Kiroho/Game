var config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 3000}
        },
    },
    scene: [ThirdScene,UI]

};




var game = new Phaser.Game(config);

var eventEmitter = new Phaser.Events.EventEmitter();