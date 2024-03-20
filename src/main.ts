import 'phaser';

export class ShooterGame extends Phaser.Scene {
    
}

const GameConfig: Phaser.Types.Core.GameConfig = {
    width: 240,
    height: 135,
    backgroundColor: '#00224D',
    scene: ShooterGame,
    physics: { default: 'arcade' },
    parent: 'gamediv',
    scale: {
        zoom: 3
    }
}

new Phaser.Game(GameConfig);