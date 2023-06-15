import '../css/style.css'
import { Engine, Input } from "excalibur"
import { ResourceLoader, Resources } from './resources.js'
import { GameScene } from './ObjectClasses/Scenes/GameScene'
import { BossScene} from './ObjectClasses/Scenes/BossScene'
import {Shooter} from "./Shooter.js";
import {SlingShot} from "./SlingShot.js";



export class Game extends Engine {

    sling

    constructor() {
        super({
            width: visualViewport.width,
            height: visualViewport.height,
        })
        this.start(ResourceLoader).then(() => this.startGame())
        this.showDebug(false);
    }

    startGame() {
        this.addScene('gameScene', new GameScene());
        this.addScene('BossScene', new BossScene())
        this.goToScene('BossScene');

        const stone = new Shooter()
        this.add(stone)

        this.sling = new SlingShot()
        this.add(this.sling)
    }

    onPreUpdate(engine, delta) {
        if (
                engine.input.keyboard.wasPressed(
                    Input.Keys.Space)) {
                console.log('klik');
                engine.add(new Shooter(this.sling.pos.x + 10, this.sling.pos.y - 85))
            }
        }


}
new Game()
