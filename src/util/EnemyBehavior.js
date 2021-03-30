class EnemyBehavior {



    patrol(enemy) {
        if (enemy.x >= enemy.currentX + 100 || enemy.x <= enemy.currentX - 100) {
            if (enemy.enemyDirection == "left") {
                enemy.currentX = enemy.x;
                enemy.enemyDirection = "right";
                enemy.anims.play('right', true);
                enemy.setVelocityX(enemy.pace);
            }
            else  {
                enemy.currentX = enemy.x;
                enemy.enemyDirection = "left";
                enemy.anims.play('left', true);
                enemy.setVelocityX(enemy.pace * -1);
            }
        }
    }


    patrolAndShoot(enemy) {
        this.patrol(enemy);
        if (Phaser.Math.Distance.Between(enemy.x, enemy.y, enemy.scene.playerOne.x, enemy.scene.playerOne.y) < 200) {
            if (enemy.x > enemy.scene.playerOne.x && enemy.enemyDirection == "left") {
                enemy.setVelocityX(0);
                enemy.continueAllowed = true;
                if (enemy.health > 50) {
                    this.shoot(enemy, "left", 1500);
                }
                else {
                    this.shoot(enemy, "left", 700);
                }
            }
            else if (enemy.x < enemy.scene.playerOne.x && enemy.enemyDirection == "right") {
                enemy.setVelocityX(0);
                enemy.continueAllowed = true;
                if (enemy.health > 50) {
                    this.shoot(enemy, "right", 1500);
                }
                else {
                    this.shoot(enemy, "right", 700);
                }
            }
            else {
                this.continuePatrol(enemy);
            }
        }
        else {
            this.continuePatrol(enemy);
        }
    }



    continuePatrol(enemy) {
        if (enemy.continueAllowed) {
            if (enemy.enemyDirection == "left") {
                enemy.setVelocityX(enemy.pace * -1);
                enemy.continueAllowed = false;
            }
            else {
                enemy.setVelocityX(enemy.pace);
                enemy.continueAllowed = false;
            }
        }
    }




    shoot(enemy, direction, interval) {

        if (enemy.nextShot > enemy.scene.time.now) { return; } // too early

        if (direction == "left") {
            enemy.mainWeapon.fire(enemy.x, enemy.y, "left");
            enemy.nextShot = enemy.scene.time.now + interval; // wait at least "interval ms" to next shot
        }
        else if (direction == "right") {
            enemy.mainWeapon.fire(enemy.x, enemy.y, "right");
            enemy.nextShot = enemy.scene.time.now + interval; // wait at least "interval ms" to next shot
        }

    }






}