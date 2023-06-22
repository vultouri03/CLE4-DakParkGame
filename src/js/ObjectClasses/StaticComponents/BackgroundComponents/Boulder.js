import { CollisionType } from "excalibur";

import { StaticComponent } from "./StaticComponent.js";

export class Boulder extends StaticComponent {
    constructor(name, position, width, height, horizontalSpriteAmount, verticalSpriteAmount, resource) {
        super(name, position, width, height, horizontalSpriteAmount, verticalSpriteAmount, resource, CollisionType.Fixed)
    }
}