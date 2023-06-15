import '../css/style.css'
import {CollisionType, Engine, Vector} from "excalibur"
import {ResourceLoader, Resources} from './resources.js'
import {GameScene} from './ObjectClasses/Scenes/GameScene.js'
import {BossScene} from "./ObjectClasses/Scenes/BossScene.js";
import {Player} from "./ObjectClasses/Characters/Player.js";


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
        let testScene = "Boss";

        this.player = new Player('player', 10, new Vector(150, 150), 100, 100, 1, 1, Resources.Fish, CollisionType.Active);

        this.addScene('gameScene', new GameScene());
        this.addScene('BossScene', new BossScene());

        if (testScene === "Boss") {
            this.goToScene('BossScene');
        } else {
            this.goToScene('gameScene');
        }
    }

    onPreUpdate(engine, delta) {

    }
}

new Game()
