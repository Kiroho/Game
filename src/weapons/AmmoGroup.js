class AmmoGroup extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene, { enable: false });

    }

    fire(x, y, direction, amount) {
        if (!amount) {
            var amount = 1;
        }
        for (var i = 1; i <= amount; i++) {
            var projectile = this.getFirstDead(false);
            if (projectile) {
                projectile.fire(x, y, direction, i);
            }
        }
        
    }

    

    loadAmmo(ammoIndex) {
        this.clear();
        if (ammoIndex == 1) {
            this.classtype = Blaster;
        }
        else if (ammoIndex == 2) {
            this.classtype = BlasterBig;
        }
        else if (ammoIndex == 3) {
            this.classtype = Grenade;
        }
        else if (ammoIndex == 4) {
            this.classtype = GrenadeBig;
        }
        else if (ammoIndex == 0) {
            this.classtype = Laser;
        }
        this.createMultiple({
            classType: this.classtype,
            quantity: 20,
            active: false,
            visible: false,
            key: 'kugel'
        })
    }

}

//                      Player Projectiles
//============================================================================================================

class Blaster extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'ballAnim');
        this.dmg = 25;
        this.enemyHit=[];

        scene.add.existing(this);
        scene.physics.add.existing(this);

        //Animation in eigene Klasse auslagern
        this.scene.anims.create({
            key: 'wobble',
            frames: this.anims.generateFrameNumbers('ballAnim', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.play('wobble', true);
        
    }


    fire(x, y, direction) {
        this.body.reset(x, y);
        this.body.setGravityY(-3000);
        this.body.enable = true;
        this.setActive(true);
        this.setVisible(true);
        
        if (direction == "left") {
            this.setVelocityX(WeaponConst.VELOCITY_X_BLASTER * -1);
        }
        else if (direction == "up") {
            this.setVelocityY(WeaponConst.VELOCITY_X_BLASTER * -1);
        }
        else {
            this.setVelocityX(WeaponConst.VELOCITY_X_BLASTER);
            this.setVelocityY(WeaponConst.VELOCITY_Y_BLASTER);
        }
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        if (!this.scene.cameras.main.worldView.contains(this.x, this.y)) {
            this.enemyHit = [];
            this.setActive(false);
            this.setVisible(false);
        }
    }

}


class BlasterBig extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'kugel');
        this.dmg = 50;
        this.enemyHit = [];

        scene.add.existing(this);
        scene.physics.add.existing(this);
    }

    fire(x, y, direction) {
        this.body.reset(x, y);
        this.setScale(2);
        this.body.setGravityY(-3000);
        this.body.enable = true;
        this.setActive(true);
        this.setVisible(true);

        if (direction == "left") {
            this.setVelocityX(WeaponConst.VELOCITY_X_BLASTER_BIG * -1);
        }
        else if (direction == "up") {
            this.setVelocityY(WeaponConst.VELOCITY_X_BLASTER_BIG * -1);
        }
        else {
            this.setVelocityX(WeaponConst.VELOCITY_X_BLASTER_BIG);
            this.setVelocityY(WeaponConst.VELOCITY_Y_BLASTER_BIG);
        }
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        if (!this.scene.cameras.main.worldView.contains(this.x, this.y)) {
            this.enemyHit = [];
            this.setActive(false);
            this.setVisible(false);
        }
    }

}


class Grenade extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'kugel');
        this.dmg = 20;
        this.enemyHit = [];
        this.bounceCounter = 3;

        scene.add.existing(this);
        scene.physics.add.existing(this);
        
    }

    fire(x, y, direction) {
        this.bounceCounter = 3;
        this.body.reset(x, y);
        this.body.setGravityY(-1000);
        this.body.enable = true;
        this.setBounce(1);
        this.setActive(true);
        this.setVisible(true);

        this.setVelocityY(WeaponConst.VELOCITY_Y_GRENADE);
        if (direction == "left") {
            this.setVelocityX(WeaponConst.VELOCITY_X_GRENADE * -1);
        }
        else if (direction == "up") {
            this.setVelocityY(WeaponConst.VELOCITY_Y_GRENADE * 2);
            this.setVelocityX(0);
        }
        else {
            this.setVelocityX(WeaponConst.VELOCITY_X_GRENADE);
        }

    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        if (!this.scene.cameras.main.worldView.contains(this.x, this.y)) {
            this.enemyHit = [];
            this.setActive(false);
            this.setVisible(false);
        }
    }

}

class GrenadeBig extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'kugel');
        this.dmg = 20;
        this.enemyHit = [];
        this.bounceCounter = 5;

        scene.add.existing(this);
        scene.physics.add.existing(this);

    }

    fire(x, y, direction, amount) {
        this.bounceCounter = 5;
        this.body.reset(x, y);
        this.body.setGravityY(-1000);
        this.body.enable = true;
        this.setBounce(1);
        this.setActive(true);
        this.setVisible(true);

        if (amount == 1) {
            this.setVelocityY(WeaponConst.VELOCITY_Y_GRENADE_BIG);
            if (direction == "left") {
                this.setVelocityX(WeaponConst.VELOCITY_X_GRENADE_BIG * -1);
            }
            else if (direction == "up") {
                this.setVelocityY(WeaponConst.VELOCITY_Y_GRENADE_BIG * 2);
                this.setVelocityX(0);
            }
            else {
                this.setVelocityX(WeaponConst.VELOCITY_X_GRENADE_BIG);
            }
        }
        else if (amount == 2) {
            this.setVelocityY(WeaponConst.VELOCITY_Y_GRENADE_BIG - 70);
            if (direction == "left") {
                this.setVelocityX(WeaponConst.VELOCITY_X_GRENADE_BIG * -1);
            }
            else if (direction == "up") {
                this.setVelocityY(WeaponConst.VELOCITY_Y_GRENADE_BIG * 2);
                this.setVelocityX(-70);
            }
            else {
                this.setVelocityX(WeaponConst.VELOCITY_X_GRENADE_BIG);
            }
        }
        else if (amount == 3) {
            this.setVelocityY(WeaponConst.VELOCITY_Y_GRENADE_BIG + 70);
            if (direction == "left") {
                this.setVelocityX(WeaponConst.VELOCITY_X_GRENADE_BIG * -1);
            }
            else if (direction == "up") {
                this.setVelocityY(WeaponConst.VELOCITY_Y_GRENADE_BIG * 2);
                this.setVelocityX(70);
            }
            else {
                this.setVelocityX(WeaponConst.VELOCITY_X_GRENADE_BIG );
            }
        }
        else {
            this.enemyHit = [];
            this.body.enable = false;
            this.setActive(false);
            this.setVisible(false);
            this.x = 0;
            this.y = 0;
        }
    }




    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        if (!this.scene.cameras.main.worldView.contains(this.x, this.y)) {
            this.enemyHit = [];
            this.setActive(false);
            this.setVisible(false);
        }
    }

}











//                      Enemy Projectiles
//============================================================================================================


class Laser extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'kugel');
        this.dmg = 20;
        this.enemyHit = [];

        scene.add.existing(this);
        scene.physics.add.existing(this);
    }

    fire(x, y, direction) {
        this.body.reset(x, y);
        this.body.setGravityY(-3000);
        this.body.enable = true;
        this.setActive(true);
        this.setVisible(true);

        if(direction == "left") {
            this.setVelocityX(WeaponConst.VELOCITY_X_LASER * -1);
        }
        else if (direction == "up") {
            this.setVelocityY(WeaponConst.VELOCITY_X_LASER * -1);
        }
        else {
            this.setVelocityX(WeaponConst.VELOCITY_X_LASER);
            this.setVelocityY(WeaponConst.VELOCITY_Y_LASER);
        }
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        if (!this.scene.cameras.main.worldView.contains(this.x, this.y)) {
            this.enemyHit = [];
            this.setActive(false);
            this.setVisible(false);
        }
    }

}






