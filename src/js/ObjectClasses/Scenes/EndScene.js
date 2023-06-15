import {Scene, Vector, Label, Font, FontUnit, Color, Input} from "excalibur";



export class EndScene extends Scene {
    constructor() {
        super({
            width: visualViewport.width,
            height: visualViewport.height,
        })

    }
    onInitialize(engine){
        super.onInitialize(engine);
        this.title = new Label({
            text: 'Tank of Worlds',
            font: new Font({
                unit: FontUnit.Px,
                family: 'Impact',
                size: 100,
                color: Color.Black,
            }),
            pos: new Vector(800, 100)
        })
        this.add(this.title);

        this.subtitle = new Label({
            text: 'Druk op enter om opnieuw te beginnen!',
            font: new Font({
                unit: FontUnit.Px,
                family: 'Impact',
                size: 28,
                color: Color.Black,
            }),
            pos: new Vector(825, 600)
        })
        this.subtitle.actions.blink(500, 100, 500);
        this.add(this.subtitle);
    }

    onPreUpdate(engine, delta) {
        if (
            engine.input.keyboard.wasPressed(
                Input.Keys.Enter)) {
            console.log('start');
            engine.goToScene('startspel')
        }
    }

}