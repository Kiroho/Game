class ProjectileGroup extends Phaser.Physics.Arcade.Group {
    constructor(scene, index) {
        super(scene.physics.world, scene);
        if (index == 2) {
            this.classtype = Projectile;
        }
        else if (index == 1) {
            this.classtype = Laser;
        }
        this.createMultiple({
            classType: this.classtype,
            frameQuantity: 30,
            active: false,
            visible: false,
            key: ['ballAnim', 'kugel']
        })

    }

    fireProjectile(x, y, velocityX, vecocityY) {
        const projectile = this.getFirstDead(false);
        if (projectile) {
            projectile.fire(x, y, velocityX, vecocityY);
        }
    }
    /*  How to shoot
        ProjectileGroup.fireProjectile(x, y, velocityX, vecocityY);
    */
}



class Projectile extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, velocityX, vecocityY) {
        super(scene, x, y, 'ballAnim');
        this.dmg = 25;
        this.scene.anims.create({
            key: 'wobble',
            frames: this.anims.generateFrameNumbers('ballAnim', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.play('wobble', true);
    }


    fire(x, y, velocityX, velocityY) {
        this.body.reset(x, y);
        this.body.setGravityY(-3000);
        this.scene.physics.add.collider(this, this.scene.platforms, function (projectile, target) {
            projectile.setActive(false);
            projectile.setVisible(false);

        });
/*this.scene.physics.add.collider(this, this.scene.enemies, function (projectile, target) {
            projectile.setActive(false);
            projectile.setVisible(false);
        });
        */
        this.setActive(true);
        this.setVisible(true);
        this.setVelocityX(velocityX);
        this.setVelocityY(velocityY);
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        if (!this.scene.cameras.main.worldView.contains(this.x, this.y)) {
            this.setActive(false);
            this.setVisible(false);
        }
    }

}





class Laser extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, velocityX, vecocityY) {
        super(scene, x, y, 'kugel');
        this.dmg = 25;
    }

    fire(x, y, velocityX, velocityY) {
        this.body.reset(x, y);
        this.body.setGravityY(-3000);
        this.scene.physics.add.collider(this, this.scene.platforms, function (projectile, target) {
            projectile.setActive(false);
            projectile.setVisible(false);

        });
      /*  this.scene.physics.add.collider(this, this.scene.enemies, function (projectile, target) {
            projectile.setActive(false);
            projectile.setVisible(false);
            target.destroy();
        });
        */

        this.setActive(true);
        this.setVisible(true);
        this.setVelocityX(velocityX);
        this.setVelocityY(velocityY);
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        if (!this.scene.cameras.main.worldView.contains(this.x, this.y)) {
            this.setActive(false);
            this.setVisible(false);
        }
    }

}