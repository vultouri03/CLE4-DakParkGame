import {Actor, Vector} from "excalibur";
import { Resources } from '../../../resources.js'

export class SlingShot extends Actor {

    constructor() {
        super();
    }

    onInitialize(engine) {
        // const sling = Resources.Slingshot.toSprite()
        // this.enableCapturePointer = true;
        this.pointer.useGraphicsBounds = true;
        this.graphics.use(Resources.Slingshot.toSprite());
    }


}
