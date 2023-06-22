import { StaticComponent } from "../BackgroundComponents/StaticComponent.js";

export class Background extends StaticComponent {
    constructor(name, position, width, height, horizontalSpriteAmount, verticalSpriteAmount, resource, collisionType) {
        super(name, position, width, height, horizontalSpriteAmount, verticalSpriteAmount, resource, collisionType)
    }
}