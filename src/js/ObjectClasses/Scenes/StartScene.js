import {Scene, Vector, Label, Font, FontUnit, Color, Input} from "excalibur";
import {Resources} from "../../resources.js";
import {StartSceneBackground} from "../StaticComponents/StartSceneBackground.js";



export class StartScene extends Scene {
    game
    constructor() {
        super({ width: visualViewport.width,
            height: visualViewport.height,})

    }
    onInitialize(engine) {
        super.onInitialize(engine);
        this.game = engine;
        const background = new StartSceneBackground()
        this.add(background)

        this.subtitle = new Label({
            text: 'Druk op ENTER om te beginnen!',
            font: new Font({
                unit: FontUnit.Px,
                family: 'Impact',
                style:'italic',
                size: 28,
                color: Color.White,
            }),
            pos: new Vector(825, 600)
        })
        this.subtitle.actions.blink(500, 200, 1500);
        this.add(this.subtitle);
    }
    onPreUpdate(engine, delta) {
        if (
            engine.input.keyboard.wasPressed(
                Input.Keys.Enter)) {
            console.log('start');
            engine.goToScene('gameScene')
        }
    }
    selectCorrectScene() {
        if(this.game.scene === "game") {
            this.game.goToScene('gameScene');
        } else {
            this.game.goToScene('bossScene')
        }
    }
}
