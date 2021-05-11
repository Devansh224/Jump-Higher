window.addEventListener('load', () => {
    const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 602,
        backgroundColor: '#000',
        scene: [Game, End],
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 400 },
                debug: false
            }
        }
    }
    
    const game = new Phaser.Game(config);
})
