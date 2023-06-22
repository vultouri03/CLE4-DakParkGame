import { CollisionType } from "excalibur";
import { StaticComponent } from "./StaticComponent";

export class Bush extends StaticComponent {
    constructor(name, position, width, height, horizontalSpriteAmount, verticalSpriteAmount, resource, collisionType) {
        super(name, position, width, height, horizontalSpriteAmount, verticalSpriteAmount, resource, collisionType)
    }
}