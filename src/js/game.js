import '../css/style.css'
import {CollisionType, Engine, Vector} from "excalibur"
import {ResourceLoader, Resources} from './resources.js'
import {StartScene} from "./ObjectClasses/Scenes/StartScene.js";
import {GameScene} from './ObjectClasses/Scenes/GameScene.js'
import {BossScene} from "./ObjectClasses/Scenes/BossScene.js";
import {Player} from "./ObjectClasses/Characters/Player.js";
import {EndScene} from "./ObjectClasses/Scenes/EndScene.js";
import {Boss} from "./ObjectClasses/Characters/Enemy/Boss.js";
import { Arcade } from "arcade-game"


export class Game extends Engine {
    player;
    scene;

    #arcade;
    #joystickListener;
    constructor() {
        super({
            width: visualViewport.width,
            height: visualViewport.height,
        })
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        localStorage.clear();
        this.scene = "Boss";
        let testScene = "Boss";

        this.#arcade = new Arcade(this, false, true);

        this.#joystickListener = (e) => this.#joyStickFound(e)
        document.addEventListener("joystickcreated",  this.#joystickListener)

        this.player = new Player('player', 10, new Vector(150, 150), 100, 130, 1, 1, Resources.PlayerFront, CollisionType.Active);

        this.addScene('startScene', new StartScene())
        this.addScene('gameScene', new GameScene(this.player, 'BossScene'));
        this.addScene('BossScene', new BossScene(this.player, 'gameScene'));
        this.addScene('endScene', new EndScene())

        if (testScene === "Boss") {
            localStorage.setItem("wood", "true");
            localStorage.setItem("nail", "true");
            localStorage.setItem("hammer", "true");
            localStorage.setItem("rock", "true");
            // localStorage.setItem("slingshot", "true");
            localStorage.setItem("inventorySlot", "4");
            this.goToScene('BossScene');
        } else if (testScene === "gameScene") {
            this.goToScene('gameScene');
        } else {
            this.goToScene('startScene');
        }
    }

    #joyStickFound(e) {
        let joystick = this.#arcade.Joysticks[e.detail]
        console.log(this.#arcade.Joysticks[e.detail])


        // debug, this shows you the names of the buttons when they are pressed
        for (const buttonEvent of joystick.ButtonEvents) {
            document.addEventListener(buttonEvent, () => console.log(buttonEvent))
        }
    }

    onPreUpdate(_engine, _delta) {
        for (let joystick of this.#arcade.Joysticks) {
            joystick.update()
        }
    }

    disconnect() {
        document.removeEventListener("joystickcreated", this.#joystickListener)
    }

}

new Game()
