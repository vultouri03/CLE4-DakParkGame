import '../css/style.css'
import {CollisionType, Engine, Vector} from "excalibur"
import {ResourceLoader, Resources} from './resources.js'
import {StartScene} from "./ObjectClasses/Scenes/StartScene.js";
import {GameScene} from './ObjectClasses/Scenes/GameScene.js'
import {BossScene} from "./ObjectClasses/Scenes/BossScene.js";
import {Player} from "./ObjectClasses/Characters/Player.js";
import {EndScene} from "./ObjectClasses/Scenes/EndScene.js";
import {Boss} from "./ObjectClasses/Characters/Boss.js";


export class Game extends Engine {
    player
    scene
    constructor() {
        super({
            width: visualViewport.width,
            height: visualViewport.height,
        })
        this.start(ResourceLoader).then(() => this.startGame())
        

    }

    startGame() {
        localStorage.clear();

        this.player = new Player('player', 10, new Vector(150, 150), 100, 130, 1, 1, Resources.PlayerFront, CollisionType.Active);
        let testScene = "Boss";
        this.scene = "boss";
        this.addScene('startScene', new StartScene())
        this.addScene('gameScene', new GameScene());
        this.addScene('BossScene', new BossScene(this.player));
        this.addScene('endScene', new EndScene())
    }
}

new Game()
