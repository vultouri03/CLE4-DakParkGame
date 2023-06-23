import {Scene, Vector, Label, Font, FontUnit, Color, Input} from "excalibur";

import {StartAndEndSceneBackground} from "../StaticComponents/Background/StartAndEndSceneBackground.js";
import {Resources} from "../../resources.js";


export class WinnerScene extends Scene {
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
        const background = new StartAndEndSceneBackground(Resources.WinScene);
        this.add(background);

        this.subtitle = new Label({
            text: 'Druk op ENTER om te spelen!',
            font: new Font({
                unit: FontUnit.Px,
                family: 'Impact',
                style:'italic',
                size: 28,
                color: Color.White,
            }),
            pos: new Vector(825, 700)
        })
        this.subtitle.actions.blink(500, 200, 1500);
        this.add(this.subtitle);
    }

    onActivate(ctx) {
        this.game.scene = "gameScene";
        localStorage.clear();
    }

    onPreUpdate(engine, delta) {
        let buttonToRestartHasBeenPressed = engine.input.keyboard.wasPressed(Input.Keys.Enter);
        if (buttonToRestartHasBeenPressed) {
            engine.goToScene('startScene');
        }
    }

}
