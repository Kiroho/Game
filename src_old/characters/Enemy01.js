
class Enemy01 extends Phaser.Physics.Arcade.Sprite {
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
        this.player.body.pushable = false;



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


        this.playerProjectiles = new ProjectileGroup(this.scene, 2);
    }
    

    addCollider(collideObject) {
        this.scene.physics.add.collider(this.player, collideObject);
    }

    /*
    shoot() {

        if (this.nextShot > this.scene.time.now) { return; } // too early

        this.playerProjectiles.fireProjectile(this.player.x-20, this.player.y, -100, 0);

        this.nextShot = this.scene.time.now + 1000; // wait at least 1 second (1000ms) to next shot
    }
    */


    updatePlayer() {

        /*if (this.key_A.isDown) {
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

        if (Phaser.Input.Keyboard.JustDown(this.key_P)) {
            var ball = this.scene.physics.add.sprite(this.player.x, this.player.y, "ball");
            ball.body.setGravityY(-3000);

            if (this.key_W.isDown && !(this.key_A.isDown|| this.key_D.isDown)) {
                ball.setVelocity(0, -800);
            }
            else if (this.key_W.isDown && this.key_A.isDown) {
                ball.setVelocity(-600, -200);
            }
            else if (this.key_W.isDown && this.key_D.isDown) {
                ball.setVelocity(600, -200);
            }
            else if (this.playerDirection == "right") {
                ball.setVelocity(800, 0);
            }
            else {
                ball.setVelocity(-800, 0);
            } 
        }*/
    }
    
    
}