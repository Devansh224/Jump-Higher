class Game extends Phaser.Scene {
    constructor() {
        super('game');
    }
    init() {
        this.score = 0;
    }

    preload() {
        this.load.image('bg', 'assets/background.png');
        this.load.image('coins', 'assets/coins.png')
        this.load.image('platform', 'assets/platform.png');
        this.load.image('danger', 'assets/danger.png');
        this.load.audio('gameAud', 'assets/Boss Theme.mp3')
        this.load.spritesheet('player', 'assets/player.png', { frameWidth: 288 / 9, frameHeight: 48 });
    }

    create() {
        this.bg = this.add.sprite(0, 0, 'bg');
        this.bg.setOrigin(0);

        this.platform = this.physics.add.staticGroup();
        this.platform.create(400, 550, 'platform').setScale(2).refreshBody();;
        this.platform.create(100, 400, 'platform');
        this.platform.create(600, 350, 'platform');
        this.platform.create(700, 100, 'platform');
        this.platform.create(200, 200, 'platform');

        this.player = this.physics.add.sprite(400, 400, 'player');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        this.coins = this.physics.add.group({
            key: 'coins',
            repeat: 9,
            setXY: { x: 60, y: 0, stepX: 75 }
        })

        this.dangers = this.physics.add.group();
        this.physics.add.collider(this.dangers, this.platform);

        this.physics.add.collider(this.player, this.dangers, hitdanger, null, this);

        this.scoreText = this.add.text(16, 16, 'Score: ' + this.score, { fillStyle: 'Consolas', fill: '#fff' })

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
            frameRate: 25,
            repeat: -1
        })
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
            frameRate: 25,
            repeat: -1
        })
        this.anims.create({
            key: 'straight',
            frames: [{ key: 'player', frame: 4 }],

        })
        let gameAud = this.sound.add('gameAud');
        gameAud.loop = true;
        gameAud.play();
        this.cursor = this.input.keyboard.createCursorKeys();
        this.physics.add.collider(this.player, this.platform);
        this.physics.add.collider(this.coins, this.platform);
        this.physics.add.overlap(this.player, this.coins, eraseCoins, null, this);

        function hitdanger(player, danger) {
            this.scene.start('end', {score: this.score});
            gameAud.stop();
        }

        function eraseCoins(player, coins) {
            coins.disableBody(true, true);

            this.score += 20;
            this.scoreText.setText('Score: ' + this.score);

            if (this.coins.countActive(true) === 0) {
                this.coins.children.iterate(function (child) {
                    child.enableBody(true, child.x, 0, true, true)
                })
                this.x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

                this.danger = this.dangers.create(this.x, 16, 'danger');
                this.danger.setBounce(1);
                this.danger.setCollideWorldBounds(true);
                this.danger.setVelocity(Phaser.Math.Between(-200, 200), 20);
            }
        }
    }

    update() {
        if (this.cursor.left.isDown) {
            this.player.setVelocityX(-500)
            this.player.anims.play('left', true);
        } else if (this.cursor.right.isDown) {
            this.player.setVelocityX(500);
            this.player.anims.play('right', true);
        } else if (this.cursor.up.isDown) {
            this.player.setVelocityY(-320);
            this.player.setVelocityX(0);
            this.player.anims.play('straight', true);
        } else if (this.cursor.down.isDown) {
            this.player.setVelocityY(320);
            this.player.setVelocityX(0);
            this.player.anims.play('straight', true);
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play('straight', true);
        }
    }
}