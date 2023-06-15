import {Vector} from "excalibur";
import {Collectable} from "./Collectable.js";
import {Resources} from '../../../resources.js';

export class NailCollectable extends Collectable {
    constructor(name, position, width, height, horizontalSpriteAmount, verticalSpriteAmount, resource, collisionType) {
        super(name, position, width, height, horizontalSpriteAmount, verticalSpriteAmount, resource, collisionType);
    }
}