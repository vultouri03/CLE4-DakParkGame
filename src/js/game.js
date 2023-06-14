import '../css/style.css'
import { Engine } from "excalibur"
import { ResourceLoader } from './resources.js'
import { GameScene } from './ObjectClasses/Scenes/GameScene.js'


export class Game extends Engine {

    constructor() {
        super({ width: 800, height: 600 })
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        this.addScene('gameScene', new GameScene());
        this.goToScene('gameScene');
    }
}

new Game()
