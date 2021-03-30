
class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, health, key, path) {
        super(scene, health, key, path);
        this.health = health;
        this.pace = 200;
        this.jumpPower = -900;
        this.key = key;
        this.path = path;
        scene.add.existing(this);
    }



    preloadPlayer(frameW, frameH) {
        this.scene.load.spritesheet(this.key, './'+this.path,
            { frameWidth: frameW, frameHeight: frameH }
        );
    }


    createPlayer(positionX, positionY) {

        this.player = this.scene.physics.add.sprite(positionX, positionY, this.key);
        this.player.health = this.health;
        this.playerDirection = "right";

        this.player.setBounce(0.0);
        this.player.setCollideWorldBounds(true);


        this.scene.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers(this.key, { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'lookLeft',
            frames: [{ key: this.key, frame: 2 }],
            frameRate: 20
        });

        this.scene.anims.create({
            key: 'turn',
            frames: [{ key: this.key, frame: 4 }],
            frameRate: 20
        });

        this.scene.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers(this.key, { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'lookRight',
            frames: [{ key: this.key, frame: 5 }],
            frameRate: 20
        });

        this.key_W = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.key_S = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.key_A = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.key_D = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.key_E = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.key_SPACE = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


        //create Player Projectiles
        this.playerProjectiles = new ProjectileGroup(this.scene, 1);
       // this.scene.playershots = this.scene.physics.add.group();
       // this.scene.playershots.add(this.playerProjectiles);

    }
    

    addCollider(collideObject) {
        this.scene.physics.add.collider(this.player, collideObject);
    }


    updatePlayer() {
        if (this.key_A.isDown) {
            this.player.setVelocityX(this.pace*-1);

            this.player.anims.play('left', true);
            this.playerDirection = "left";
        }
        else if (this.key_D.isDown) {
            this.player.setVelocityX(this.pace);

            this.player.anims.play('right', true);
            this.playerDirection = "right";
        }
        else {
            this.player.setVelocityX(0);

            if (this.playerDirection == "left") {
                this.player.anims.play('lookLeft');
            }
            else if (this.playerDirection == "right") {
                this.player.anims.play('lookRight');
            }

           
        }

        if (this.key_W.isDown) {
            this.player.anims.play('turn');
            this.lookUp = true;
        }

        if (this.key_S.isDown && this.player.body.touching.down) {
            //crouching
        }

        if (Phaser.Input.Keyboard.JustDown(this.key_SPACE)) {
            if (this.player.body.touching.down) {
                this.player.setVelocityY(this.jumpPower);
            }
        }

        if (Phaser.Input.Keyboard.JustDown(this.key_E)) {

            if (this.key_W.isDown && !(this.key_A.isDown|| this.key_D.isDown)) {
                this.playerProjectiles.fireProjectile(this.player.x, this.player.y, 0, -800);
            }
            else if (this.key_W.isDown && this.key_A.isDown) {
                this.playerProjectiles.fireProjectile(this.player.x, this.player.y, -600, -200);
            }
            else if (this.key_W.isDown && this.key_D.isDown) {
                this.playerProjectiles.fireProjectile(this.player.x, this.player.y, 600, -800);
            }
            else if (this.playerDirection == "right") {
                this.playerProjectiles.fireProjectile(this.player.x, this.player.y, 200, 0);
            }
            else {
                this.playerProjectiles.fireProjectile(this.player.x, this.player.y, -800, 0);
            } 
        }
        /*
        if (Phaser.Input.Keyboard.JustDown(this.key_E)) {
            this.ball = this.scene.physics.add.sprite(this.player.x, this.player.y, "ball");
            this.ball.body.setGravityY(-3000);

            if (this.key_W.isDown && !(this.key_A.isDown|| this.key_D.isDown)) {
                this.ball.setVelocity(0, -800);
            }
            else if (this.key_W.isDown && this.key_A.isDown) {
                this.ball.setVelocity(-600, -200);
            }
            else if (this.key_W.isDown && this.key_D.isDown) {
                this.ball.setVelocity(600, -200);
            }
            else if (this.playerDirection == "right") {
                this.ball.setVelocity(800, 0);
            }
            else {
                this.ball.setVelocity(-800, 0);
            } 
        }
        */
    }
    

}