import '../css/style.css'
import { Engine, Input } from "excalibur"
import { ResourceLoader, Resources } from './resources.js'
import { GameScene } from './GameScene.js'
import {Shooter} from "./Shooter.js";


export class Game extends Engine {

    constructor() {
        super({width: 800, height: 600})
        this.start(ResourceLoader).then(() => this.startGame())
        this.showDebug(true);
        this.debug.transform.showAll = true;
    }

    startGame() {
        this.addScene('gameScene', new GameScene());
        this.goToScene('gameScene');

        const stone = new Shooter()
        this.add(stone)
    }

    onPreUpdate(engine, delta) {


        if (
            engine.input.keyboard.wasPressed(
                Input.Keys.Space)) {
            console.log('klik');
            engine.add(new Shooter)
        }
    }

}
new Game()
