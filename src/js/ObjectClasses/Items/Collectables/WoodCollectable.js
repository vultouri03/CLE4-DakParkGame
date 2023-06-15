import {Vector} from "excalibur";
import {Resources} from '../../../resources.js';
import {Collectable} from "./Collectable.js";

export class WoodCollectable extends Collectable {
    constructor(name, position, width, height, horizontalSpriteAmount, verticalSpriteAmount, resource, collisionType) {
        super(name, position, width, height, horizontalSpriteAmount, verticalSpriteAmount, resource, collisionType);
    }
}