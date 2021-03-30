
class SecondScene extends Phaser.Scene {
    constructor() {
        super({
            key: "SecondScene"
        });
        
    }

    preload() {
        this.load.image('background', './assets/background.jpeg');
        this.load.image('ground', './assets/ground.png');
        this.load.image('ball', './assets/ball.png');
        this.load.image('kugel', './assets/kugel.png');
        this.load.spritesheet('ballAnim', './assets/ballAnim.png', { frameWidth: 16, frameHeight: 16 });
        
        this.playerOne = new Player(this, 100, 'playerOne', './assets/player.png');
        this.playerOne.preloadPlayer(32, 48);

        this.enemyOne = new Enemy01(this, 100, 'enemyOne', './assets/player.png');
        this.enemyOne.preloadPlayer(32, 48);

    }

    create() {
        this.cameras.main.setBounds(0, 0, 800 * 2, 600);
        this.physics.world.setBounds(0, 0, 800 * 2, 600);

        var background = this.add.image(400, 300, 'background');
        this.createPlatforms();
        this.playerOne.createPlayer(100, 400);
        
        this.createEnemies();

        
       // this.playerOne.addCollider(this.platforms);
        this.playerOne.addCollider(this.enemies);

        
        this.physics.add.collider(this.playerOne.player, this.platforms, function(player, target) {
           // player.health += 10;
          //  console.log(player.health);
            playerHealthText.setText('Health: ' + player.health);
        });

        


     
        let playerHealthText = this.add.text(16, 16, 'Health: ', { fontSize: '32px', fill: '#fff' });

        this.cameras.main.startFollow(this.playerOne.player, true, 0.05, 0.05);
    }


    update(delta) {

        this.playerOne.updatePlayer();
        this.enemyOne.updatePlayer();


        



    }




    createPlatforms() {
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        this.platforms.create(800, 568, 'ground').setScale(2).refreshBody();
        this.platforms.create(1200, 568, 'ground').setScale(2).refreshBody();
        this.platforms.create(520, 450, 'ground');
        this.platforms.create(70, 340, 'ground');
        this.platforms.create(580, 280, 'ground');

    }

    createEnemies() {
        this.enemyOne.createPlayer(200, 400);
        this.enemies = this.physics.add.group();
        this.enemies.add(this.enemyOne.player);
        this.physics.add.collider(this.enemies, this.platforms);
      /*  this.physics.add.collider(this.enemies, this.playerOne.playerProjectiles, function (enemy, projectile) {
            projectile.setActive(false);
            projectile.setVisible(false);
            enemy.health -= projectile.dmg;
            console.log(enemy.health);
            if (enemy.health == 0) {
                enemy.destroy();
            }
        });*/
        this.playershots = this.add.group();
        this.playershots.add(this.playerOne.playerProjectiles);
        this.physics.add.collider(this.enemies, this.playershots, function (enemy, projectile) {
            projectile.setActive(false);
            projectile.setVisible(false);
            enemy.health -= projectile.dmg;
            console.log(enemy.health);
            if (enemy.health == 0) {
                enemy.destroy();
            }
        });
    }


}



