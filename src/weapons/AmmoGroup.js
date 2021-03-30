class AmmoGroup extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene);

    }

    fire(x, y, direction) {
        const projectile = this.getFirstDead(false);
        if (projectile) {
            projectile.fire(x, y, direction);
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
            this.classtype = Granade;
        }
        else if (ammoIndex == 4) {
            this.classtype = Granade;
        }
        else if (ammoIndex == 0) {
            this.classtype = Laser;
        }
        this.createMultiple({
            classType: this.classtype,
            frameQuantity: 20,
            active: false,
            visible: false,
            key: ['ballAnim', 'kugel']
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
    }

    fire(x, y, direction) {
        this.body.reset(x, y);
        this.setScale(2);
        this.body.setGravityY(-3000);
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


class Granade extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'kugel');
        this.dmg = 20;
        this.enemyHit = [];
        this.bounceCounter = 3;
        
    }

    fire(x, y, direction) {
        this.body.reset(x, y);
        this.body.setGravityY(-1000);
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




//                      Enemy Projectiles
//============================================================================================================


class Laser extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'kugel');
        this.dmg = 20;
        this.enemyHit = [];
    }

    fire(x, y, direction) {
        this.body.reset(x, y);
        this.body.setGravityY(-3000);
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






