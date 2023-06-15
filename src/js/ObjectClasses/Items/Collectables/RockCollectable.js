import {Vector} from "excalibur";
import {Collectable} from "./Collectable.js";
import {Resources} from '../../../resources.js';

export class RockCollectable extends Collectable {
    constructor() {
        super({
            name: "rock",
            position: new Vector(100,100),
            width: 25,
            height: 25,
            spriteWidth: 1,
            spriteHeight: 1,
            resource: Resources.Rock
        });
    }
}