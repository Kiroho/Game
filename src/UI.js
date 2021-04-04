class UI extends Phaser.Scene {
    constructor() {
        super({
            key: "UIScene"
        });
        this.weaponCooldown = 0;
    }
    initialize() {
        Phaser.Scene.call(this, { key: 'UIScene', active: true });
    }

    preload() {
        this.load.image('ground', './assets/ground.png');
    }


    create() {
        //Spieler Lebenspunkte
        this.playerHealth = this.add.text(10, 10, 'Health: 0', { font: '48px Arial', fill: '#ffffff' });
        eventEmitter.on('playerHealth', function (hp) {
            this.playerHealth.setText("Health: " + hp);
        }, this)

        //Spieler Waffe 1
        this.playerWeaponOne = this.add.text(10, 670, 'Mainweapon: ', { font: '36px Arial', fill: '#ffffff' });
        eventEmitter.on('weaponOne', function (weapon) {
            this.playerWeaponOne.setText("Mainweapon: " + weapon);
        }, this)

        //Spieler Waffe 2
        this.playerWeaponTwo = this.add.text(400, 670, 'Offweapon: ', { font: '36px Arial', fill: '#ffffff' });
        eventEmitter.on('weaponTwo', function (weapon) {
            this.playerWeaponTwo.setText("Offweapon: " + weapon);
        }, this)

        //Aktive Waffe - Farben
        this.playerWeaponOne.setTint(0xff0000);
        eventEmitter.on('activeWeapon', function (weapon) {
            if (weapon == 1) {
                this.playerWeaponOne.setTint(0xff0000);
                this.playerWeaponTwo.clearTint();
            }
            else {
                this.playerWeaponTwo.setTint(0xff0000);
                this.playerWeaponOne.clearTint();
            }
        }, this)

        //Cooldown Timer
        this.cooldownText = this.add.text(800, 670, 'Active: ', { font: '36px Arial', fill: '#ffffff' });
        this.cdTimer = this.time.addEvent();
        eventEmitter.on('weaponCD', function (cooldown) {
            this.cdTimer = this.time.addEvent({ delay: cooldown});
            this.weaponCooldown = cooldown;
        }, this)

            
        
    }

    update() {
        this.cooldownText.setText('CD: ' + (this.weaponCooldown / 1000 - (this.cdTimer.getElapsedSeconds().toString().substr(0, 1))));
    }


}