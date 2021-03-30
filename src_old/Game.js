var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 3000}
        },
    },
    scene: [SecondScene,]

};




var game = new Phaser.Game(config);

