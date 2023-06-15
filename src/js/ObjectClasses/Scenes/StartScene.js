import {Scene, Vector, Label, Font, FontUnit, Color, Input} from "excalibur";



export class StartScene extends Scene {
    constructor() {
        super({ width: visualViewport.width,
            height: visualViewport.height,})

    }
    onInitialize(engine) {
        super.onInitialize(engine);
        this.title = new Label({
            text: 'Het Dak Park spel',
            font: new Font({
                unit: FontUnit.Px,
                style:'oblique',
                family: 'Impact',
                size: 100,
                color: Color.Yellow,
            }),
            pos: new Vector(700, 100)
        })
        this.add(this.title);

        this.subtitle = new Label({
            text: 'Druk op ENTER om te beginnen!',
            font: new Font({
                unit: FontUnit.Px,
                family: 'Impact',
                style:'italic',
                size: 28,
                color: Color.LightGray,
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
}
