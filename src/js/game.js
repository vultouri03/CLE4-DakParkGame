import '../css/style.css'
import {Engine, Physics, Input} from "excalibur"
import {ResourceLoader} from './resources.js'
import {GameScene} from './ObjectClasses/Scenes/GameScene.js'
import {BossScene} from "./ObjectClasses/Scenes/BossScene.js";
import {Shooter} from "./ObjectClasses/Items/Shooter/Shooter.js";
// import {SlingShot} from "./ObjectClasses/Items/Shooter/SlingShot.js";


export class Game extends Engine {

    sling

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

        // const stone = new Shooter()
        // this.add(stone)
        //
        // this.sling = new SlingShot()
        // this.add(this.sling)
    }

    onPreUpdate(engine, delta) {
        if (engine.input.keyboard.wasPressed(Input.Keys.Space)) {
            engine.add(new Shooter(this.sling.pos.x + 10, this.sling.pos.y - 85))
        }
    }
}

new Game()
