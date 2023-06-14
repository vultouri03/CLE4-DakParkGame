import {Actor, Engine, Vector, Input} from "excalibur";
import { ResourceLoader,Resources } from './resources.js'
import {Shooter} from "./Shooter.js";

export class SlingShot extends Actor {

    constructor() {
        super();
    }

    onInitialize(engine) {
        const sling = Resources.Slingshot.toSprite()
        this.enableCapturePointer = true;
        this.pointer.useGraphicsBounds = true;
        this.graphics.use(Resources.Slingshot.toSprite());
        this.pos = new Vector(150, 150);
    }


}
