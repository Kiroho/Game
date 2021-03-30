class ColliderManager {
    constructor(scene) {
        this.scene = scene;
    }
    setupCollider() {
        this.scene.playerGroup = this.scene.add.group();                                  //Spieler
        this.scene.enemyGroup = this.scene.add.group();                                   //Gegner

        this.scene.platforms = this.scene.physics.add.staticGroup();                      //Plattformen

        this.scene.touchPlatforms = this.scene.add.group();                               //Kann Plattformen berühren

        this.scene.playerProjectiles_Normal = this.scene.add.group();                     //Werden zerstört, wenn Gegner oder Plattform getroffen.
        this.scene.playerProjectiles_PierceEnemies = this.scene.add.group();              //Durchbohrt Gegner. Werden zerstört, wenn Plattform getroffen.
        this.scene.playerProjectiles_PierceAll = this.scene.add.group();                  //Durchbohrt Gegner und Plattformen.
        this.scene.playerProjectiles_Bounce = this.scene.add.group();                     //Projectil prallt von Plattformen ab.

        this.scene.enemyProjectiles_Normal = this.scene.add.group();                      //Werden zerstört, wenn Spieler oder Plattform getroffen.
        this.scene.enemyProjectiles_PiercePlayer = this.scene.add.group();                //Durchbohrt Spieler. Werden zerstört, wenn Plattform getroffen.
        this.scene.enemyProjectiles_PierceAll = this.scene.add.group();                   //Durchbohrt Spieler und Plattformen.



        //playerGroup====================================================================================================================================
        this.scene.physics.add.collider(this.scene.playerGroup, this.scene.platforms, function (projectile, platform) {
            //console.log(2);
        });

        //touchPlatforms====================================================================================================================================
        this.scene.physics.add.collider(this.scene.touchPlatforms, this.scene.platforms);

        //                                                Player Projectiles
        //playerProjectiles_Normal====================================================================================================================================
        //Projectiles - Enemies
        this.scene.physics.add.collider(this.scene.enemyGroup, this.scene.playerProjectiles_Normal, function (enemy, projectile) {
            destoryProjectile(projectile);
            enemy.health -= projectile.dmg;
            if (enemy.health <= 0) {
                enemy.destroy();
            }
        });
        //Projectiles - Platforms
        this.scene.physics.add.collider(this.scene.playerProjectiles_Normal, this.scene.platforms, function (projectile, platform) {
            destoryProjectile(projectile);
            //console.log(2);
        });

        //playerProjectiles_PierceEnemies====================================================================================================================================
        //Projectiles - Enemies
        this.scene.physics.add.overlap(this.scene.enemyGroup, this.scene.playerProjectiles_PierceEnemies, function (enemy, projectile) {
            if (projectile.enemyHit.every(function (element) { return element != enemy.ID })) {
                enemy.health -= projectile.dmg;
                projectile.enemyHit.push(enemy.ID);
                if (enemy.health <= 0) {
                    enemy.destroy();
                }
            }
        });
        //Projectiles - Platforms
        this.scene.physics.add.collider(this.scene.platforms, this.scene.playerProjectiles_PierceEnemies, function (platform, projectile) {
            destoryProjectile(projectile);
        });

        //playerProjectiles_PierceAll====================================================================================================================================
        //Projectiles - Enemies
        this.scene.physics.add.overlap(this.scene.enemyGroup, this.scene.playerProjectiles_PierceAll, function (enemy, projectile) {
            if (projectile.enemyHit.every(function (element) { return element != enemy.ID })) {
                enemy.health -= projectile.dmg;
                projectile.enemyHit.push(enemy.ID);
                if (enemy.health <= 0) {
                    enemy.destroy();
                }
            }
        });

        //playerProjectiles_Normal====================================================================================================================================
        //Projectiles - Enemies
        this.scene.physics.add.collider(this.scene.enemyGroup, this.scene.playerProjectiles_Bounce, function (enemy, projectile) {
            destoryProjectile(projectile);
            enemy.health -= projectile.dmg;
            if (enemy.health <= 0) {
                enemy.destroy();
            }
        });
        //Projectiles - Platforms
        this.scene.physics.add.collider(this.scene.platforms, this.scene.playerProjectiles_Bounce, function (platform, projectile) {
            //destoryProjectile(projectile);
            console.log("hit");
        });





        //                                                Enemy Projectiles
        //enemyProjectiles_Normal====================================================================================================================================
        //Projectiles - Player
        this.scene.physics.add.collider(this.scene.playerGroup, this.scene.enemyProjectiles_Normal, function (player, projectile) {
            destoryProjectile(projectile);
            player.health -= projectile.dmg;
            if (player.health <= 0) {
                player.setVisible(false);
            }
        });
        //Projectiles - Platforms
        this.scene.physics.add.collider(this.scene.platforms, this.scene.enemyProjectiles_Normal, function (platform, projectile) {
            destoryProjectile(projectile);
        });

        //enemyProjectiles_PiercePlayer====================================================================================================================================
        //Projectiles - Player
        this.scene.physics.add.overlap(this.scene.playerGroup, this.scene.enemyProjectiles_PiercePlayer, function (player, projectile) {
            if (projectile.enemyHit.every(function (element) { return element != player })) {
                player.health -= projectile.dmg;
                projectile.enemyHit.push(player);
                if (player.health <= 0) {
                    player.setVisible(false);
                }
            }
        });
        //Projectiles - Platforms
        this.scene.physics.add.collider(this.scene.platforms, this.scene.enemyProjectiles_PiercePlayer, function (platform, projectile) {
            destoryProjectile(projectile);
        });


        //enemyProjectiles_PierceAll====================================================================================================================================
        //Projectiles - Player
        this.scene.physics.add.overlap(this.scene.playerGroup, this.scene.enemyProjectiles_PierceAll, function (player, projectile) {
            if (projectile.enemyHit.every(function (element) { return element != player })) {
                player.health -= projectile.dmg;
                projectile.enemyHit.push(player);
                if (player.health <= 0) {
                    player.setVisible(false);
                }
            }
        });


        function destoryProjectile(projectile) {
            projectile.enemyHit = [];
            projectile.setActive(false);
            projectile.setVisible(false);
            projectile.x = 0;
            projectile.y = 0;
        }

    }

    

}
