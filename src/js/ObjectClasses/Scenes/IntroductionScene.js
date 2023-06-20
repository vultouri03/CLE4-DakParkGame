import { Scene } from "excalibur";
import { IntroductionText } from "../../Text/IntroductionText";

export class IntroductionScene extends Scene {

    constructor() {
        super({width: visualViewport.width,
        heigth: visualViewport.height})
    }

    onInitialize(engine) {
        this.add(new IntroductionText(300, 300))
    }
}