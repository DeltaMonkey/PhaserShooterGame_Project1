import 'phaser';
import TextureKeys from '../consts/TextureKeys';
import AnimationKeys from '../consts/AnimationKeys';

export default class PlayerGameObject extends Phaser.GameObjects.Container
{
    private player: Phaser.GameObjects.Sprite;
    private arrow: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);

        this.player = scene.add.sprite(0, 0, TextureKeys.PlayerWalk1)
            .setOrigin(0, 0)
            .play(AnimationKeys.PlayerIdle);

        this.arrow = scene.input.keyboard!.createCursorKeys();

        this.add(this.player);

        // Add a physics body
        scene.physics.add.existing(this);

        // adjust physics body size and offset
        const body = this.body as Phaser.Physics.Arcade.Body;
        body.setSize(this.player.width,  this.player.height);
    }

    preUpdate() {
        const startX = this.x;
        const startY = this.y;

        if(this.arrow.right.isDown) {
            this.x += 2
        }
        else if(this.arrow.left.isDown) {
            this.x -= 2
        }
        
        // Handle vertical movements
        if(this.arrow.down.isDown) {
            this.y += 2
        }
        else if(this.arrow.up.isDown) {
            this.y -= 2
        }

        if(startX == this.x && startY == this.y)
            this.player.play(AnimationKeys.PlayerIdle, true);
        else this.player.play(AnimationKeys.PlayerWalk, true);
    }
}