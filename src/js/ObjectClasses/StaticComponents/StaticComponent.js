import { Entity } from "../Entity";

export class StaticComponent extends Entity {
    constructor(name, position, width, height, horizontalSpriteAmount, verticalSpriteAmount, resource, collisionType, scale) {
        super(name, position, width, height, horizontalSpriteAmount, verticalSpriteAmount, resource, collisionType)
        
    }


}