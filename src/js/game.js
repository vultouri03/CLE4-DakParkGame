import '../css/style.css'
import {CollisionType, Engine, Vector} from "excalibur"
import {ResourceLoader, Resources} from './resources.js'
import { Arcade } from "arcade-game"

import {BossScene} from "./ObjectClasses/Scenes/BossScene.js";
import {EndScene} from "./ObjectClasses/Scenes/EndScene.js";
import {GameScene} from './ObjectClasses/Scenes/GameScene.js'
import {StartScene} from "./ObjectClasses/Scenes/StartScene.js";
import {WinnerScene} from "./ObjectClasses/Scenes/WinnerScene.js";

import { IntroductionScene } from './ObjectClasses/Scenes/IntroductionScene';
import {Player} from "./ObjectClasses/Characters/Player.js";
import {Boss} from "./ObjectClasses/Characters/Enemy/Boss.js";
import {Inventory} from "./ObjectClasses/Items/Inventory/Inventory.js";


export class Game extends Engine {
    player;
    inventory;
    scene;

    #arcade;
    #joystickListener;

    constructor() {
        super({
            width: visualViewport.width,
            height: visualViewport.height,
            //displayMode: DisplayMode.FillScreen
        })
        
        this.start(ResourceLoader).then(() => this.startGame())
        this.showDebug(false);
    }

    startGame() {
        localStorage.clear();
        this.scene = "introScene";
        let testScene = "";

        this.#arcade = new Arcade(this, false, true);

        this.#joystickListener = (e) => this.#joyStickFound(e)
        document.addEventListener("joystickcreated",  this.#joystickListener)

        this.player = new Player('player', 10, new Vector(150, 150), 100, 130, 1, 1, Resources.PlayerFront, CollisionType.Active);

        this.inventory = new Inventory(new Vector(visualViewport.width/2, (visualViewport.height - 100)));

        if (testScene === "Boss") {
            localStorage.setItem("wood", "true");
            localStorage.setItem("nail", "true");
            localStorage.setItem("hammer", "true");
            localStorage.setItem("rock", "true");
            localStorage.setItem("slingshot", "true");
            localStorage.setItem("inventorySlot", "4");
            this.player.ammunitionAmount = 9;
        }

        this.addScene('startScene', new StartScene());
        this.addScene('gameScene', new GameScene(this.player, 'BossScene', this.inventory));
        this.addScene('BossScene', new BossScene(this.player, 'gameScene', this.inventory));
        this.addScene('introScene', new IntroductionScene())
        this.addScene('endScene', new EndScene());
        this.addScene('winScene', new WinnerScene());

        if (testScene === "Boss") {
            this.goToScene('BossScene');
        } else if (testScene === "gameScene") {
            this.goToScene('gameScene');
        } else if(testScene === "Intro") {
            this.goToScene('introductionScene')
        } else {
            this.goToScene('startScene');
        }
    }

    #joyStickFound(e) {
        let joystick = this.#arcade.Joysticks[e.detail]

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
