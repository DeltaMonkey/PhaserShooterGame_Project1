import 'phaser';
import SceneKeys from '../consts/SceneKeys';
import TextureKeys from '../consts/TextureKeys';
import AnimationKeys from '../consts/AnimationKeys';

export default class PreLoader extends Phaser.Scene
{
    constructor() {
        super(SceneKeys.PreLoader);
    }

    preload() {
        this.load.image(TextureKeys.PlayerWalk1, 'assets/playerSprites/player_walk_1.png');
        this.load.image(TextureKeys.PlayerWalk2, 'assets/playerSprites/player_walk_2.png');

        this.load.image(TextureKeys.PlayerBullet, 'assets/player_bullet.png');
        this.load.image(TextureKeys.Enemy, 'assets/enemy.png');
        this.load.image(TextureKeys.EnemyBullet, 'assets/enemy_bullet.png');
        this.load.image(TextureKeys.Wall, 'assets/wall.png');
    }

    create() {

        this.anims.create({
            key: AnimationKeys.PlayerWalk, // name of the animation
            // helper to generate frames 
            frames: [
                { key: TextureKeys.PlayerWalk1 },
                { key: TextureKeys.PlayerWalk2 }
            ],
            frameRate: 12,
            repeat: -1 // -1 to loop forever
        });

        this.anims.create({
            key: AnimationKeys.PlayerIdle, // name of the animation
            // helper to generate frames 
            frames: [
                { key: TextureKeys.PlayerWalk1 }
            ],
            frameRate: 1,
        });

        this.scene.start(SceneKeys.Level_1);
    }
}