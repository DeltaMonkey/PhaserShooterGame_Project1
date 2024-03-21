import 'phaser';
import TextureKeys from '../consts/TextureKeys';
import AnimationKeys from '../consts/AnimationKeys';

const FIRERATE = 500; // Time between shots in milliseconds

export default class PlayerGameObject extends Phaser.GameObjects.Container
{
    private player: Phaser.GameObjects.Sprite;
    private arrow: Phaser.Types.Input.Keyboard.CursorKeys;
    private playerBullets: Phaser.Physics.Arcade.Group;
    private lastFired: number = 0;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);

        this.player = scene.add.sprite(0, 0, TextureKeys.PlayerWalk1)
            .setOrigin(0.5, 0.5)
            .play(AnimationKeys.PlayerIdle);

        this.arrow = scene.input.keyboard!.createCursorKeys();

        this.add(this.player);

        // Add a physics body
        scene.physics.add.existing(this);

        // adjust physics body size and offset
        const body = this.body as Phaser.Physics.Arcade.Body;
        body.setOffset(-this.player.width / 2 ,  -this.player.height / 2);
        body.setSize(this.player.width,  this.player.height);

        this.playerBullets = this.scene.physics.add.group();
    }

    preUpdate() {
        const body = this.body as Phaser.Physics.Arcade.Body;

        body.setVelocity(0, 0);

        if(this.arrow.right.isDown) {
            body.setVelocityX(50);
        }
        else if(this.arrow.left.isDown) {
            body.setVelocityX(-50);
        }
        
        // Handle vertical movements
        if(this.arrow.down.isDown) {
            body.setVelocityY(50);
        }
        else if(this.arrow.up.isDown) {
            body.setVelocityY(-50);
        }

        if(body.velocity.x != 0 && body.velocity.y != 0)
        {
            body.velocity.x = body.velocity.x / 1.5;
            body.velocity.y = body.velocity.y / 1.5;
        }

        if(body.velocity.x != 0 || body.velocity.y != 0)
            this.player.play(AnimationKeys.PlayerWalk, true);
        else  this.player.play(AnimationKeys.PlayerIdle, true);

        // Update bullet positions
        this.playerBullets.getChildren().forEach((bullet: Phaser.GameObjects.GameObject) => {
            if (bullet.body!.position.x > this.scene.scale.width) {
                bullet.destroy(); // Delete bullet if out of screen
            }
            if (bullet.body && bullet.body!.position.x < 0) {
                bullet.destroy(); // Delete bullet if out of screen
            }
            if (bullet.body && bullet.body!.position.y > this.scene.scale.height) {
                bullet.destroy(); // Delete bullet if out of screen
            }
            if (bullet.body && bullet.body!.position.y < 0) {
                bullet.destroy(); // Delete bullet if out of screen
            }
        });

        // Fire bullet towards mouse position on left mouse click
        if (this.scene.input.activePointer.leftButtonDown() &&  new Date().getTime() - this.lastFired > FIRERATE) {
            this.fireBullet(this.scene.input.mousePointer.x, this.scene.input.mousePointer.y);
            this.lastFired = new Date().getTime();
        }
    }

    fireBullet(x: number, y: number) {
        const bullet = this.playerBullets.create(
            (this.body?.position.x as number) + this.player.width / 2, 
            (this.body?.position.y as number) + this.player.width / 2, 
            TextureKeys.PlayerBullet); // Create a bullet at (0,0)
        bullet.setOrigin(0.5, 0.5); // Set the origin to the center of the bullet
        this.scene.physics.moveToObject(bullet, { x: x, y: y }, 100); // Move bullet towards mouse position
    }
}