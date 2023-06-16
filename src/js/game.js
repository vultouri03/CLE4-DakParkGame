import '../css/style.css'
import {CollisionType, Engine, Vector} from "excalibur"
import {ResourceLoader, Resources} from './resources.js'
import {StartScene} from "./ObjectClasses/Scenes/StartScene.js";
import {GameScene} from './ObjectClasses/Scenes/GameScene.js'
import {BossScene} from "./ObjectClasses/Scenes/BossScene.js";
import {Player} from "./ObjectClasses/Characters/Player.js";
import {EndScene} from "./ObjectClasses/Scenes/EndScene.js";
import {Boss} from "./ObjectClasses/Characters/Enemy/Boss.js";


export class Game extends Engine {
    player

    constructor() {
        super({
            width: visualViewport.width,
            height: visualViewport.height,
        })
        this.start(ResourceLoader).then(() => this.startGame())
        this.showDebug(true);

    }

    startGame() {
        localStorage.clear();

        this.player = new Player('player', 10, new Vector(150, 150), 100, 100, 1, 1, Resources.Fish, CollisionType.Active);

        this.addScene('startScene', new StartScene())
        this.addScene('gameScene', new GameScene(this.player));
        this.addScene('BossScene', new BossScene(this.player));
        this.addScene('endScene', new EndScene())


        let testScene = "gameScene";
        if (testScene === "Boss") {
            this.goToScene('BossScene');
        } else {
            this.goToScene('gameScene');
        }
    }
}

new Game()
