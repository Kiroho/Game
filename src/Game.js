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
    scene: [ThirdScene,]

};




var game = new Phaser.Game(config);

