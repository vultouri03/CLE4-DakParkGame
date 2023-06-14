import {Vector} from "excalibur";
import {Collectable} from "../../Collectable.js";
import {Resources, ResourceLoader} from '../../resources.js';

export class Slingshot extends Collectable {
    constructor() {
        super({
            name: "slingshot",
            position: new Vector(400,100),
            width: 50,
            height: 50,
            spriteWidth: 1,
            spriteHeight: 1,
            resource: Resources.Slingshot
        });
    }
}