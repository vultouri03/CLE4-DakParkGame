import {Actor} from "excalibur";
import { Resources } from '../../../resources.js'

export class SlingShot extends Actor {

    constructor(position, scale) {
        super({
            pos: position,
            scale: scale,
        });
    }

    onInitialize(engine) {
        this.pointer.useGraphicsBounds = true;
        this.graphics.use(Resources.Slingshot.toSprite());
    }


}
