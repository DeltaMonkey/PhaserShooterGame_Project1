import 'phaser';
import SceneKeys from '../consts/SceneKeys';
import TextureKeys from '../consts/TextureKeys';

export default class PreLoader extends Phaser.Scene
{
    constructor() {
        super(SceneKeys.PreLoader);
    }

    preload() {
        this.load.image(TextureKeys.Player, 'assets/player.png');
        this.load.image(TextureKeys.PlayerBullet, 'assets/player_bullet.png');
        this.load.image(TextureKeys.Enemy, 'assets/enemy.png');
        this.load.image(TextureKeys.EnemyBullet, 'assets/enemy_bullet.png');
        this.load.image(TextureKeys.Wall, 'assets/wall.png');
    }

    create() {
        this.scene.start(SceneKeys.Level_1);
    }
}