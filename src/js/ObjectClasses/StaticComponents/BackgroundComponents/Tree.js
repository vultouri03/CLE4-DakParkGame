import { Actor, CollisionType, Vector } from "excalibur";
import { StaticComponent } from "./StaticComponent.js";

export class Tree extends Actor {
    name;
    constructor(name, position, width, height, horizontalSpriteAmount, verticalSpriteAmount, resource, collisionType) {
        super({
            height: 20,
            width: 100,
            collisionType: collisionType,
        });

        this.name = name;
        this.scale = new Vector(width / (resource.width / horizontalSpriteAmount), height / (resource.height / verticalSpriteAmount));
        this.graphics.use(resource.toSprite());
        this.pos = position;
        this.graphics.anchor = new Vector(0.5 , 0.97);
        this.z = 3;
    }
}