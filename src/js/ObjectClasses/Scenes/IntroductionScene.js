import { CollisionType, Scene, Vector } from "excalibur";
import { IntroductionText } from "../../Text/IntroductionText";
import { BackGround } from "../StaticComponents/background";
import { Resources } from "../../resources";

export class IntroductionScene extends Scene {

    constructor() {
        super({width: visualViewport.width,
        heigth: visualViewport.height})
    }

    onInitialize(engine) {
        this.add(new BackGround('introductionBackGround' , new Vector(visualViewport.width/ 2, visualViewport.height/2), visualViewport.width + 100, visualViewport.height + 50, 1, 1, Resources.introduction, CollisionType.PreventCollision));
        this.add(new IntroductionText(300, 300));
    }
}