import '../css/style.css'
import {CollisionType, Engine, Vector} from "excalibur"
import {ResourceLoader, Resources} from './resources.js'
import {StartScene} from "./ObjectClasses/Scenes/StartScene.js";
import {GameScene} from './ObjectClasses/Scenes/GameScene.js'
import {BossScene} from "./ObjectClasses/Scenes/BossScene.js";
import {Player} from "./ObjectClasses/Characters/Player.js";
import {EndScene} from "./ObjectClasses/Scenes/EndScene.js";
import {Boss} from "./ObjectClasses/Characters/Enemy/Boss.js";
import {WinnerScene} from "./ObjectClasses/Scenes/WinnerScene.js";
import { IntroductionScene } from './ObjectClasses/Scenes/IntroductionScene';


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
        this.scene = "game";
        let testScene = "Intro";
        this.player = new Player('player', 10, new Vector(0, 0), 100, 130, 1, 1, Resources.PlayerFront, CollisionType.Active);

        this.addScene('startScene', new StartScene())
        this.addScene('gameScene', new GameScene(this.player, 'BossScene'));
        this.addScene('BossScene', new BossScene(this.player, 'gameScene'));
        this.addScene('introductionScene', new IntroductionScene())
        this.addScene('endScene', new EndScene())
        this.addScene('winScene', new WinnerScene())




        if (testScene === "Boss") {
            localStorage.setItem("wood", "true");
            localStorage.setItem("nail", "true");
            localStorage.setItem("hammer", "true");
            localStorage.setItem("rock", "true");
            localStorage.setItem("slingshot", "true");
            localStorage.setItem("inventorySlot", "4");
            this.goToScene('BossScene');
        } else if (testScene === "gameScene") {
            this.goToScene('gameScene');
        } else if(testScene === "Intro") {
            this.goToScene('introductionScene')
        }else {
            this.goToScene('startScene');
        }

    }
}

new Game()
