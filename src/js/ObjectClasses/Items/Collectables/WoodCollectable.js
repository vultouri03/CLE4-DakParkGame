import {Vector} from "excalibur";
import {Resources} from '../../../resources.js';
import {Collectable} from "./Collectable.js";

export class WoodCollectable extends Collectable {
    constructor() {
        super({
            name: "wood",
            position: new Vector(500,100),
            width: 100,
            height: 100,
            spriteWidth: 1,
            spriteHeight: 1,
            resource: Resources.Wood
        });
    }
}