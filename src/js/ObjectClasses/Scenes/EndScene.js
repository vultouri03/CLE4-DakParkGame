import {Scene, Vector, Label, Font, FontUnit, Color, Input} from "excalibur";

import {StartAndEndSceneBackground} from "../StaticComponents/Background/StartAndEndSceneBackground.js";
import {Resources} from "../../resources.js";


export class EndScene extends Scene {
    constructor() {
        super({
            width: visualViewport.width,
            height: visualViewport.height,
        })
    }

    onInitialize(engine) {
        super.onInitialize(engine);

        this.game = engine;
        const background = new StartAndEndSceneBackground(Resources.EndScene);
        this.add(background);

        this.subtitle = new Label({
            text: 'Druk op ENTER om opnieuw te beginnen!',
            font: new Font({
                unit: FontUnit.Px,
                family: 'Impact',
                size: 28,
                color: Color.White,
            }),
            pos: new Vector(775, 600)
        })
        this.subtitle.actions.blink(500, 100, 500);
        this.add(this.subtitle);
    }

    onActivate(ctx) {
        let ifDiedInGameSceneClearInventory = this.game.scene === "gameScene";
        if (ifDiedInGameSceneClearInventory) {
            localStorage.clear()
        }
    }

    onPreUpdate(engine, delta) {
        let restartButtonIsPressed = engine.input.keyboard.wasPressed(Input.Keys.Enter);
        if (restartButtonIsPressed) {
            engine.goToScene('startScene');
        }
    }
}