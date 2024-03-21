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
        const body = this.body as Phaser.Physics.Arcade.Body;

        body.setVelocity(0, 0);

        if(this.arrow.right.isDown) {
            body.setVelocityX(150);
        }
        else if(this.arrow.left.isDown) {
            body.setVelocityX(-150);
        }
        
        // Handle vertical movements
        if(this.arrow.down.isDown) {
            body.setVelocityY(150);
        }
        else if(this.arrow.up.isDown) {
            body.setVelocityY(-150);
        }

        if(body.velocity.x != 0 && body.velocity.y != 0)
        {
            body.velocity.x = body.velocity.x / 1.5;
            body.velocity.y = body.velocity.y / 1.5;
        }

        if(body.velocity.x != 0 || body.velocity.y != 0)
            this.player.play(AnimationKeys.PlayerWalk, true);
        else  this.player.play(AnimationKeys.PlayerIdle, true);
    }
}