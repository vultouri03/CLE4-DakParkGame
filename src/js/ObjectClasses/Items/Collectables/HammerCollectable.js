import {Vector} from "excalibur";
import {Collectable} from "./Collectable.js";
import {Resources} from '../../../resources.js';

export class HammerCollectable extends Collectable {
    constructor() {
        super({
            name: "hammer",
            position: new Vector(200,100),
            width: 50,
            height: 50,
            spriteWidth: 1,
            spriteHeight: 1,
            resource: Resources.Hammer
        });
    }
}