import 'phaser';
import SceneKeys from '../consts/SceneKeys';
import TextureKeys from '../consts/TextureKeys';

export default class Level_1 extends Phaser.Scene
{
    private player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private arrow:  Phaser.Types.Input.Keyboard.CursorKeys;

    constructor() {
        super(SceneKeys.Level_1);
    }

    preload() {
        this.player = this.physics.add.sprite(120, 67, TextureKeys.Player);
        this.physics.add.sprite(50, 50, TextureKeys.PlayerBullet);
        this.arrow = this.input.keyboard!.createCursorKeys();
    }

    update() {
        // Handle horizontal movements
        if(this.arrow.right.isDown) {
            this.player.x += 3;
        }
        else if(this.arrow.left.isDown) {
            this.player.x -= 3;
        }

        // Handle vertical movements
        if(this.arrow.down.isDown) {
            this.player.y += 3;
        }
        else if(this.arrow.up.isDown) {
            this.player.y -= 3;
        }
    }

    create() {
        console.log("Level_1 is working");       
    }
}