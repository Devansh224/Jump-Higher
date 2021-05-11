class End extends Phaser.Scene {
    constructor() {
        super('end');
    }
    init(data) {
        this.score = data.score;
    }

    preload() {
        this.load.image('bg', 'assets/background.png');
    }

    create() {
        this.bg = this.add.sprite(0, 0, 'bg');
        this.bg.setOrigin(0);
        this.gameOver = this.add.text(290, 301, 'Game Over', { fontFamily: 'Sans-serif', fill: '#f00', fontSize: '50px' })
        this.scoreText = this.add.text(300, 360, 'Your Score: ' + this.score, { fillStyle: 'Consolas', fill: '#fff' })
    }
}