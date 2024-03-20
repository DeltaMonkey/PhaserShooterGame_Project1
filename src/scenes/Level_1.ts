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

        this.physics.add.sprite(50, 50, TextureKeys.PlayerBullet);
    }

    create() {
        console.log("Level_1 is working");       
    }
}