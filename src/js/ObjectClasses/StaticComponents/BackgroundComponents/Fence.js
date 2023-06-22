import { CollisionType } from "excalibur";

import { StaticComponent } from "./StaticComponent.js";

export class Fence extends StaticComponent {
    constructor(name, position, width, height, horizontalSpriteAmount, verticalSpriteAmount, resource) {
        super(name, position, width, height, horizontalSpriteAmount, verticalSpriteAmount, resource, CollisionType.Fixed)
    }
}