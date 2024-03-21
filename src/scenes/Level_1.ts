import 'phaser';
import SceneKeys from '../consts/SceneKeys';
import TextureKeys from '../consts/TextureKeys';
import PlayerGameObject from '../gameObjects/PlayerGameObject';

export default class Level_1 extends Phaser.Scene
{
    private playerGameObject: PlayerGameObject;
   

    constructor() {
        super(SceneKeys.Level_1);
    }

    preload() {
        this.playerGameObject = new PlayerGameObject(this, 120, 67);
        this.add.existing(this.playerGameObject);
    }

    create() {
        this.createWalls();

        console.log("Level_1 is working");       
    }

    createWalls() {
        const brickSize = 4; // Size of my brick image (4x4 pixels)
    
        // Add walls to the edge of the game scene
        const topWall = this.add.tileSprite(0, 1, this.scale.width, brickSize, TextureKeys.Wall).setOrigin(0, 0);
        const bottomWall = this.add.tileSprite(0, this.scale.height - 3, this.scale.width, brickSize, TextureKeys.Wall).setOrigin(0, 0);
        const leftWall = this.add.tileSprite(0, 0, brickSize, this.scale.height, TextureKeys.Wall).setOrigin(0, 0);
        const rightWall = this.add.tileSprite(this.scale.width - 4, 0, brickSize, this.scale.height, TextureKeys.Wall).setOrigin(0, 0);
    
        // Enable physics on the background
        this.physics.add.existing(topWall, true);
        this.physics.add.existing(bottomWall, true);
        this.physics.add.existing(leftWall, true);
        this.physics.add.existing(rightWall, true);

        // Enable collision with walls
        this.physics.add.collider(this.playerGameObject, topWall);
        this.physics.add.collider(this.playerGameObject, bottomWall);
        this.physics.add.collider(this.playerGameObject, leftWall);
        this.physics.add.collider(this.playerGameObject, rightWall);

    }
}