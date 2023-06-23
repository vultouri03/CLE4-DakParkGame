import {ScreenElement, Vector} from "excalibur";

export class UIElement extends ScreenElement {
    name;

    constructor(name, position, width, height, horizontalSpriteAmount, verticalSpriteAmount, resource, collisionType) {
        super({
            height: resource.height / verticalSpriteAmount,
            width: resource.width / horizontalSpriteAmount,
            collisionType: collisionType,
        });

        this.name = name;
        this.scale = new Vector(width / (resource.width / horizontalSpriteAmount), height / (resource.height / verticalSpriteAmount));
        this.graphics.use(resource.toSprite());
        this.pos = position;




    }
}