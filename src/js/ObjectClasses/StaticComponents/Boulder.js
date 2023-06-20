import { CollisionType } from "excalibur";
import { StaticComponent } from "./StaticComponent";

export class Boulder extends StaticComponent {
    constructor(name, position, width, height, horizontalSpriteAmount, verticalSpriteAmount, resource) {
        super(name, position, width, height, horizontalSpriteAmount, verticalSpriteAmount, resource, CollisionType.Fixed)
    }
}