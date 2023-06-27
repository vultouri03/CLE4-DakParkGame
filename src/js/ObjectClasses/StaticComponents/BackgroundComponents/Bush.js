import { StaticComponent } from "./StaticComponent.js";

export class Bush extends StaticComponent {
    constructor(name, position, width, height, horizontalSpriteAmount, verticalSpriteAmount, resource, collisionType) {
        super(name, position, width, height, horizontalSpriteAmount, verticalSpriteAmount, resource, collisionType)
        this.z = 3;
    }
}