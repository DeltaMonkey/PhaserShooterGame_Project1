import 'phaser';

import PreLoader from './scenes/PreLoader';
import Level_1 from './scenes/Level_1';

const GameConfig: Phaser.Types.Core.GameConfig = {
    width: 240,
    height: 135,
    backgroundColor: '#00224D',
    scene: [PreLoader, Level_1],
    physics: { default: 'arcade', arcade: {
        debug: true
    } },
    parent: 'gamediv',
    scale: {
        zoom: 3
    }
}

export default new Phaser.Game(GameConfig);