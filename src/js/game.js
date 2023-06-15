import '../css/style.css'
import {Engine, Physics, Input} from "excalibur"
import {ResourceLoader} from './resources.js'
import {GameScene} from './ObjectClasses/Scenes/GameScene.js'
import {BossScene} from "./ObjectClasses/Scenes/BossScene.js";
import {Shooter} from "./ObjectClasses/Items/Shooter/Shooter.js";
import {SlingShot} from "./ObjectClasses/Items/Shooter/SlingShot.js";
import { Player } from './ObjectClasses/Characters/Player';


export class Game extends Engine {

    sling
    player

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
        this.player = new Player('player', 10, new Vector(150, 150), 100, 100, 1, 1, Resources.Fish, CollisionType.Active);
        this.addScene('gameScene', new GameScene());
        this.addScene('BossScene', new BossScene())
        this.goToScene('BossScene');

        const stone = new Shooter()
        this.add(stone)

        this.sling = new SlingShot()
        this.add(this.sling)
    }

    onPreUpdate(engine, delta) {
        if (engine.input.keyboard.wasPressed(Input.Keys.Space)) {
            engine.add(new Shooter(this.sling.pos.x + 10, this.sling.pos.y - 85))
        }
    }
}

new Game()
