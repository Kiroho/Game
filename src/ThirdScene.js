
class ThirdScene extends Phaser.Scene {
    constructor() {
        super({
            key: "ThirdScene"
        });
        this.collideManager = new ColliderManager(this);
        this.enemyBehavior = new EnemyBehavior();
        this.count = 0;
    }

    preload() {
        this.load.image('background', './assets/background.png');
        this.load.image('ground', './assets/ground.png');
        this.load.image('ball', './assets/ball.png');
        this.load.image('kugel', './assets/kugel.png');
        this.load.spritesheet('player', './assets/player.png',{ frameWidth: 32, frameHeight: 48 });
        this.load.spritesheet('ballAnim', './assets/ballAnim.png', { frameWidth: 16, frameHeight: 16 });
    }

    create() {
        //create World
        this.cameras.main.setBounds(0, 0, 1280 * 2, 720);
        this.physics.world.setBounds(0, 0, 1280 * 2, 720);

        var background = this.add.image(1280, 360, 'background');

        //set Collider
        this.collideManager.setupCollider();


        //create Level
        this.createPlatforms();

        //create Player
        this.playerOne = new Player(this, 100, 550, 'player');
        this.playerOne.setUpPlayer();
        this.playerGroup.add(this.playerOne);
        //this.playerProjectiles_Normal.add(this.playerOne.mainWeapon.ammoGroup);


        //Create Enemies
        this.enemyOne = new EnemyProto(this, 400, 550, 'player');
        this.enemyOne.setUpEnemy();
        this.enemyGroup.add(this.enemyOne);
        this.touchPlatforms.add(this.enemyOne);







        this.cameras.main.startFollow(this.playerOne, true, 0.05, 0.05);
    }


    update() {

        this.playerOne.playerControlUpdate();
        this.enemyOne.behaviorUpdate();
       // console.log("Enemy 1: " + this.enemyOne.health);

    }




    createPlatforms() {
        this.platforms.create(400, 690, 'ground').setScale(2).refreshBody();
        this.platforms.create(1200, 690, 'ground').setScale(2).refreshBody();
        this.platforms.create(2000, 690, 'ground').setScale(2).refreshBody();
        this.platforms.create(520, 550, 'ground');
        this.platforms.create(70, 440, 'ground');
        this.platforms.create(580, 380, 'ground');

    }

   


}



