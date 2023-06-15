import {Vector} from "excalibur";
import {Collectable} from "../../Collectable.js";
import {Resources, ResourceLoader} from '../../resources.js';

export class Nail extends Collectable {
    constructor() {
        super({
            name: "nail",
            position: new Vector(300,100),
            width: 25,
            height: 25,
            spriteWidth: 1,
            spriteHeight: 1,
            resource: Resources.Nail
        });
    }
}