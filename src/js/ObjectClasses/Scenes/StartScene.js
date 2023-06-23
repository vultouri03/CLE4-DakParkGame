import {Scene, Vector, Label, Font, FontUnit, Color, Input} from "excalibur";

import {StartAndEndSceneBackground} from "../StaticComponents/Background/StartAndEndSceneBackground.js";
import {Resources} from "../../resources.js";


export class StartScene extends Scene {
    game
    constructor() {
        super({
            width: visualViewport.width,
            height: visualViewport.height,
        })
    }

    onInitialize(engine) {
        super.onInitialize(engine);

        this.game = engine;
        const background = new StartAndEndSceneBackground(Resources.StartScene);
        this.add(background);

        this.subtitle = new Label({
            text: 'Druk op ENTER om te beginnen!',
            font: new Font({
                unit: FontUnit.Px,
                family: 'Impact',
                style:'italic',
                size: 28,
                color: Color.White,
            }),
            pos: new Vector(825, 600),
        })
        this.subtitle.actions.blink(500, 200, 1500);
        this.add(this.subtitle);
    }

    onPreUpdate(engine, delta) {
        let startButtonHasBeenPressed =  engine.input.keyboard.wasPressed(Input.Keys.Enter);
        if (startButtonHasBeenPressed) {
            this.selectCorrectScene();
        }
    }

    selectCorrectScene() {
        let nextSceneIsGameScene = this.game.scene === "gameScene";
        let nextSceneIsIntro = this.game.scene === "introScene";

        if (nextSceneIsGameScene) {
            this.game.player.pos = new Vector(150, 150);
            this.game.goToScene('gameScene');
        } else if(nextSceneIsIntro){
            this.game.goToScene('introScene');
        } else {
            this.game.player.pos = new Vector(100, 300);
            this.game.goToScene('BossScene');
        }
    }
}
