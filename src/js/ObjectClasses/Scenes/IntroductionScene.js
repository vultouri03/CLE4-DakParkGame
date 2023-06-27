import { CollisionType, Scene, Vector } from "excalibur";
import { IntroductionText } from "../../Text/IntroductionText";
import { Resources } from "../../resources";
import { Background } from "../StaticComponents/Background/Background";

export class IntroductionScene extends Scene {
    intro;

    constructor() {
        super({width: visualViewport.width,
        heigth: visualViewport.height})
    }

    onInitialize(engine) {
        this.intro = new IntroductionText(300, 300)
        this.add(new Background('introductionBackGround' , new Vector(visualViewport.width/ 2, visualViewport.height/2), visualViewport.width + 100, visualViewport.height + 50, 1, 1, Resources.introduction, CollisionType.PreventCollision));
        this.add(this.intro);
        
    }

    onPreUpdate() {
        
        if(this.intro.dialogueLine === 8) {
            this.add(new Background('introductionBackGround' , new Vector(visualViewport.width/ 2, visualViewport.height/2), visualViewport.width + 100, visualViewport.height + 50, 1, 1, Resources.Arcade, CollisionType.PreventCollision));
        }

        if(this.intro.dialogueLine === 9) {
            this.add(new Background('introductionBackGround' , new Vector(visualViewport.width/ 2, visualViewport.height/2), visualViewport.width + 100, visualViewport.height + 50, 1, 1, Resources.KeyBoard, CollisionType.PreventCollision))
        }
    }
}