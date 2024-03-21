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
        this.load.image(TextureKeys.EnemyWalk1, 'assets/enemySprites/enemy_walk_1.png');
        this.load.image(TextureKeys.EnemyWalk2, 'assets/enemySprites/enemy_walk_2.png');
        this.load.image(TextureKeys.EnemyBullet, 'assets/enemy_bullet.png');
        this.load.image(TextureKeys.Wall, 'assets/wall.png');
    }

    create() {

        this.anims.create({
            key: AnimationKeys.PlayerWalk, // name of the animation
            frames: [
                { key: TextureKeys.PlayerWalk1 },
                { key: TextureKeys.PlayerWalk2 }
            ],
            frameRate: 12,
            repeat: -1 // -1 to loop forever
        });

        this.anims.create({
            key: AnimationKeys.PlayerIdle, // name of the animation
            frames: [
                { key: TextureKeys.PlayerWalk1 }
            ],
            frameRate: 1,
        });

        this.anims.create({
            key: AnimationKeys.EnemyWalk, // name of the animation
            frames: [
                { key: TextureKeys.EnemyWalk1 },
                { key: TextureKeys.EnemyWalk2 }
            ],
            frameRate: 12,
            repeat: -1 // -1 to loop forever
        });

        this.anims.create({
            key: AnimationKeys.EnemyIdle, // name of the animation
            frames: [
                { key: TextureKeys.EnemyWalk1 }
            ],
            frameRate: 1,
        });

        this.scene.start(SceneKeys.Level_1);
    }
}