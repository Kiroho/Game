class Weapon {
    constructor(scene) {
        this.scene = scene;
        this.type = null;
        this.attackRate = null;
        this.attackRange = null;
        this.projectileAmount = null;
        this.ammoGroup = new AmmoGroup(this.scene.scene, 1)
        this.direction = null;
    }

    
    chooseWeapon(type) {
        if (type == 'Blaster') {
            this.setUpWeapon(
                WeaponConst.TYPE_BLASTER,
                WeaponConst.ATK_RATE_BLASTER,
                WeaponConst.VELOCITY_X_BLASTER,
                WeaponConst.VELOCITY_Y_BLASTER,
                WeaponConst.PROJECTILE_AMOUNT_BLASTER,
                WeaponConst.AMMO_GROUP_BLASTER
            );
            console.log("Blaster choosen");
            this.assignToGroup(this.scene.scene.playerProjectiles_Normal);

        }
        else if (type == 'BlasterBig') {
            this.setUpWeapon(
                WeaponConst.TYPE_BLASTER_BIG,
                WeaponConst.ATK_RATE_BLASTER_BIG,
                WeaponConst.VELOCITY_X_BLASTER_BIG,
                WeaponConst.VELOCITY_Y_BLASTER_BIG,
                WeaponConst.PROJECTILE_AMOUNT_BLASTER_BIG,
                WeaponConst.AMMO_GROUP_BLASTER_BIG
            );
            console.log("BlasterBig choosen");
            this.assignToGroup(this.scene.scene.playerProjectiles_PierceEnemies);

        }
        else if (type == 'Grenade') {
            this.setUpWeapon(
                WeaponConst.TYPE_GRENADE,
                WeaponConst.ATK_RATE_GRENADE,
                WeaponConst.VELOCITY_X_GRENADE,
                WeaponConst.VELOCITY_Y_GRENADE,
                WeaponConst.PROJECTILE_AMOUNT_GRENADE,
                WeaponConst.AMMO_GROUP_GRENADE
            );
            console.log("Grenade choosen");
            this.assignToGroup(this.scene.scene.playerProjectiles_Bounce);

        }
        else if (type == 'GrenadeBig') {
            this.setUpWeapon(
                WeaponConst.TYPE_GRENADE_BIG,
                WeaponConst.ATK_RATE_GRENADE_BIG,
                WeaponConst.VELOCITY_X_GRENADE_BIG,
                WeaponConst.VELOCITY_Y_GRENADE_BIG,
                WeaponConst.PROJECTILE_AMOUNT_GRENADE_BIG,
                WeaponConst.AMMO_GROUP_GRENADE_BIG
            );
            console.log("GrenadeBig choosen");
            this.assignToGroup(this.scene.scene.playerProjectiles_Bounce);

        }
        else if (type == 'Laser') {
            this.setUpWeapon(
                WeaponConst.TYPE_LASER,
                WeaponConst.ATK_RATE_LASER,
                WeaponConst.VELOCITY_X_LASER,
                WeaponConst.VELOCITY_Y_LASER,
                WeaponConst.PROJECTILE_AMOUNT_LASER,
                WeaponConst.AMMO_GROUP_LASER
            );
            console.log("Laser choosen");
            this.scene.scene.enemyProjectiles_Normal.add(this.ammoGroup);
            this.scene.scene.enemyProjectiles_PiercePlayer.remove(this.ammoGroup);
            this.scene.scene.enemyProjectiles_PierceAll.remove(this.ammoGroup);
        }

    }


    setUpWeapon(type, attackRate, velocityX, velocityY, amount, ammoGroup ) {
        this.type = type;
        this.attackRate = attackRate;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
        this.projectileAmount = amount;
        this.ammoGroup.loadAmmo(ammoGroup);
        //this.scene.scene.enemyProjectiles_Normal.add(this.ammoGroup);
    }


    fire(x, y, direction) {
        this.ammoGroup.fire(x, y, direction, this.projectileAmount);
    }


    assignToGroup(group) {

        this.scene.scene.playerProjectiles_Normal.remove(this.ammoGroup);
        this.scene.scene.playerProjectiles_PierceEnemies.remove(this.ammoGroup);
        this.scene.scene.playerProjectiles_PierceAll.remove(this.ammoGroup);
        this.scene.scene.playerProjectiles_Bounce.remove(this.ammoGroup);

        group.add(this.ammoGroup)
    }

}