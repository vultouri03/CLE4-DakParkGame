import {Scene, Vector, Label, Font, FontUnit, Color, Input} from "excalibur";
import {Resources} from "../../resources.js";
import {WinnerSceneBackground} from "../StaticComponents/winnerSceneBackground.js";



export class WinnerScene extends Scene {
    game
    constructor() {
        super({ width: visualViewport.width,
            height: visualViewport.height,})

    }
    onInitialize(engine) {
        super.onInitialize(engine);
        this.game = engine;
        const background = new WinnerSceneBackground()
        this.add(background)

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
        if(this.game.scene === "game") {
        }
    }

    onPreUpdate(engine, delta) {
        if (
            engine.input.keyboard.wasPressed(
                Input.Keys.Enter)) {
            engine.goToScene('startScene')
        }
    }

}
