class FirstScene extends Phaser.Scene {
    constructor() {
        super({
            key: "FirstScene"
        });
    }

    preload() {
        this.load.image('background', './assets/background.jpeg');
        this.load.image('ground', './assets/ground.png');
        this.load.image('ball', './assets/ball.png');
        this.load.spritesheet('player', './assets/player.png',
            { frameWidth: 32, frameHeight: 48 }
        );
    }

    create() {
        var playerDirection = "right";
        this.cameras.main.setBounds(0, 0, 800 * 2, 600);
        this.physics.world.setBounds(0, 0, 800 * 2, 600);

        const background = this.add.image(400, 300, 'background');

        this.createPlatforms();
        this.createPlayer();


        this.key_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.key_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        this.input.keyboard.on('keydown-W', function (event) {
            if (this.player.body.touching.down) {
                this.player.setVelocityY(-900);
            }
        }, this);


        this.input.keyboard.on('keyup-P', function (event) {
            var ball = this.physics.add.sprite(this.player.x, this.player.y, "ball");
            ball.body.setGravityY(-2500);
            if (this.playerDirection == "right") {
                ball.setVelocity(800, 0);
            }
            else {
                ball.setVelocity(-800, 0);
            }
        }, this);


        this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
    }


    update(delta) {

        


        if (this.key_A.isDown) {
            this.player.setVelocityX(-200);

            this.player.anims.play('left', true);
            this.playerDirection = "left";
        }
        else if (this.key_D.isDown) {
            this.player.setVelocityX(200);

            this.player.anims.play('right', true);
            this.playerDirection = "right";
        }
        else {
            this.player.setVelocityX(0);

            this.player.anims.play('turn');
        }

        /*if (this.key_W.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-900);
        }
        */

        if (this.key_S.isDown && this.player.body.touching.down) {
            //crouching
        }



    }




    createPlatforms() {
        this.platforms = this.physics.add.staticGroup()
        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody()
        this.platforms.create(800, 568, 'ground').setScale(2).refreshBody()
        this.platforms.create(1200, 568, 'ground').setScale(2).refreshBody()
        this.platforms.create(520, 450, 'ground')
        this.platforms.create(70, 340, 'ground')
        this.platforms.create(600, 280, 'ground')

    }

    createPlayer() {

        this.player = this.physics.add.sprite(100, 450, 'player').setScale(1.5).refreshBody();

        this.player.setBounce(0.0);



        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.platforms);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'player', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

    }


}