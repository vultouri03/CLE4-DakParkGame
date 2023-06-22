import { CollisionType } from "excalibur";
import { StaticComponent } from "./StaticComponent.js";

export class Tree extends StaticComponent {
    constructor(name, position, width, height, horizontalSpriteAmount, verticalSpriteAmount, resource) {
        super(name, position, width, height, horizontalSpriteAmount, verticalSpriteAmount, resource, CollisionType.Fixed)
    }
}