import '../css/style.css'
import {Engine, Physics} from "excalibur"
import {ResourceLoader} from './resources.js'
import {GameScene} from './ObjectClasses/Scenes/GameScene.js'
import {BossScene} from "./ObjectClasses/Scenes/BossScene.js";


export class Game extends Engine {

    constructor() {
        super({
            width: visualViewport.width,
            height: visualViewport.height,
        })
        this.start(ResourceLoader).then(() => this.startGame())
        this.showDebug(false);
        Physics.useRealisticPhysics();
    }

    startGame() {
        localStorage.clear();
        this.addScene('gameScene', new GameScene());
        this.addScene('BossScene', new BossScene())
        this.goToScene('BossScene');
    }

    onPreUpdate(engine, delta) {

    }
}

new Game()
