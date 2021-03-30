class EnemyProto extends Phaser.Physics.Arcade.Sprite {
    constructor(scene,x, y, key) {
        super(scene, x, y, key);
        this.health = 100;
        this.pace = 50;
        this.jumpPower = -900;
        this.enemyDirection = "left";
        this.key = key;
        this.mainWeapon;
        this.currentX = this.x;
        this.continueAllowed = false;
        this.nextShot = 0;
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);
        this.setBounce(0.0);
        this.body.pushable = false;
        this.ID = Math.floor(Math.random() * 10000000) + 1;
        //Möglicher Bug: Falls mehrere Gegner die gleiche ID haben sollten und vom gleichen, durchbohrenden Projektil getroffen werden, wird nur dem ersten Gegner Schaden zugefügt.
    }


    setUpEnemy() {
        this.setUpAnimations();
        this.setUpBehavior();
        this.setUpWeapons();
    }


    setUpWeapons() {
        this.mainWeapon = new Weapon(this);
        this.mainWeapon.chooseWeapon(WeaponConst.TYPE_LASER);
    }

    setUpBehavior() {
        this.setVelocityX(this.pace*-1);
        this.anims.play('left', true);
    }

    
    setUpAnimations() {
        //Enemy Animationen einfügen, sobald verfügbar.
        //Ggf. Animationen in eigenen Klasse auslagern.
    }


    behaviorUpdate() {
        if (this.health > 0) {
            this.scene.enemyBehavior.patrolAndShoot(this);      //Behavior-Objekt von Scene auf Enemy Objekt auslagern
            
        }
        
    }



    

}