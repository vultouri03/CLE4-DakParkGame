import {Vector} from "excalibur";
import {Collectable} from "../../Collectable.js";
import {Resources, ResourceLoader} from '../../resources.js';

export class Wood extends Collectable {
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