class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene,x, y, key) {
        super(scene, x, y, key);
        this.health = 100;
        this.pace = 200;
        this.jumpPower = -900;
        this.playerDirection = "right";
        this.key = key;
        this.weaponOneMain;
        this.weaponOneSecondary;
        this.weaponTwoMain;
        this.weaponTwoSecondary;
        this.weaponInUse = 1;
        this.weaponCooldown = 5000;
        this.allowSwitch = true;
        this.setUIOnce = true;
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);
        this.setBounce(0.0);

    }


    setUpPlayer() {
        this.setUpAnimations();
        this.setUpControls();
        this.setUpWeapons();
    }


    setUpUI() {

        eventEmitter.emit('playerHealth', this.health);
        eventEmitter.emit('weaponOne', this.weaponOneMain.type);
        eventEmitter.emit('weaponTwo', this.weaponTwoMain.type);
        eventEmitter.emit('activeWeapon', this.weaponInUse);
        
    }



    setUpWeapons() {
        this.weaponOneMain = new Weapon(this);
        this.weaponOneMain.chooseWeapon(WeaponConst.TYPE_BLASTER);
        this.weaponOneSecondary = new Weapon(this);
        this.weaponOneSecondary.chooseWeapon(WeaponConst.TYPE_BLASTER_BIG);

        this.weaponTwoMain = new Weapon(this);
        this.weaponTwoMain.chooseWeapon(WeaponConst.TYPE_GRENADE);
        this.weaponTwoSecondary = new Weapon(this);
        this.weaponTwoSecondary.chooseWeapon(WeaponConst.TYPE_GRENADE_BIG);
        
    }

    allowSwitch() {
        console.log(this.allowSwitch = true);
        console.log("hallo");
    }

    setUpControls() {
        this.key_W = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.key_S = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.key_A = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.key_D = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.key_E = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.key_C = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        this.key_X = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
        this.key_SPACE = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
    
    setUpAnimations() { //auslagern in eigene Klasse.
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

    }


    playerControlUpdate() {
        if (this.setUIOnce) {
            this.setUpUI();
            this.setUIOnce = false;
        }
        //movement
        if (this.key_A.isDown) {
            this.setVelocityX(this.pace * -1);
            this.anims.play('left', true);
            this.playerDirection = "left";
        }
        else if (this.key_D.isDown) {
            this.setVelocityX(this.pace);
            this.anims.play('right', true);
            this.playerDirection = "right";
        }
        else {
            this.setVelocityX(0);
            if (this.playerDirection == "left") {
                this.anims.play('lookLeft');
            }
            else if (this.playerDirection == "right") {
                this.anims.play('lookRight');
            }
        }

        if (this.key_W.isDown && !(this.key_A.isDown || this.key_D.isDown)) {
            this.anims.play('turn');
        }

        if (Phaser.Input.Keyboard.JustDown(this.key_SPACE)) {
            if (this.body.touching.down) {
                this.setVelocityY(this.jumpPower);
            }
        }

        //Weapons
        if (Phaser.Input.Keyboard.JustDown(this.key_E)) {
            this.bigShot = this.scene.time.now + 700;
        }

        if (Phaser.Input.Keyboard.JustUp(this.key_E)) {
            if (this.weaponInUse == 1) {
                this.useWeaponOne();
            }
            else {
                this.useWeaponTwo();
            }

        }

        if (Phaser.Input.Keyboard.JustDown(this.key_C)) {
            if (this.weaponCD > this.scene.time.now) { return; } // big shot
            else {
                this.weaponInUse = this.weaponInUse * -1;
                eventEmitter.emit('activeWeapon', this.weaponInUse);
                eventEmitter.emit('weaponCD', this.weaponCooldown);
                this.scene.time.addEvent(this.timedEvent);
                this.weaponCD = this.scene.time.now + this.weaponCooldown;
            }
        }


 /*       if (Phaser.Input.Keyboard.JustDown(this.key_X)) {
            this.weaponOneMain.chooseWeapon(WeaponConst.TYPE_BLASTER);
        }

*/

    }





    useWeaponOne() {
        if (this.nextShot > this.scene.time.now) { return; } // big shot
        else {
            if (this.bigShot > this.scene.time.now) {
                if (this.key_W.isDown && !(this.key_A.isDown || this.key_D.isDown)) {
                    this.weaponOneMain.fire(this.x, this.y, "up");
                }
                else if (this.playerDirection == "right") {
                    this.weaponOneMain.fire(this.x, this.y, "right");
                }
                else {
                    this.weaponOneMain.fire(this.x, this.y, "left");
                }
            }
            else {                                            // normal shot
                if (this.key_W.isDown && !(this.key_A.isDown || this.key_D.isDown)) {
                    this.weaponOneSecondary.fire(this.x, this.y, "up");
                }
                else if (this.playerDirection == "right") {
                    this.weaponOneSecondary.fire(this.x, this.y, "right");
                }
                else {
                    this.weaponOneSecondary.fire(this.x, this.y, "left");
                }
            }
            this.nextShot = this.scene.time.now + this.weaponOneMain.attackRate;
        }

    }


    useWeaponTwo() {
        if (this.nextShot > this.scene.time.now) { return; } // big shot
        else {
            if (this.bigShot > this.scene.time.now) {
                if (this.key_W.isDown && !(this.key_A.isDown || this.key_D.isDown)) {
                    this.weaponTwoMain.fire(this.x, this.y, "up");
                }
                else if (this.playerDirection == "right") {
                    this.weaponTwoMain.fire(this.x, this.y, "right");
                }
                else {
                    this.weaponTwoMain.fire(this.x, this.y, "left");
                }
            }
            else {                                            // normal shot
                if (this.key_W.isDown && !(this.key_A.isDown || this.key_D.isDown)) {
                    this.weaponTwoSecondary.fire(this.x, this.y, "up");
                }
                else if (this.playerDirection == "right") {
                    this.weaponTwoSecondary.fire(this.x, this.y, "right");
                }
                else {
                    this.weaponTwoSecondary.fire(this.x, this.y, "left");
                }
            }
            this.nextShot = this.scene.time.now + this.weaponTwoMain.attackRate;
        }

    }


}