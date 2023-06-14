import {Actor, Vector} from "excalibur";

export class InventoryItem extends Actor {
   name;

    constructor(name, position, width, height, horizontalSpriteAmount, verticalSpriteAmount, resource, collisionType) {
        super({
            pos: position,
            height: resource.height/verticalSpriteAmount,
            width: resource.width/horizontalSpriteAmount,
            collisionType: collisionType,
        });

        this.name = name;
        this.scale = new Vector(width / (resource.width / horizontalSpriteAmount), height / (resource.height / verticalSpriteAmount));
        this.graphics.use(resource.toSprite());
    }

    onPostUpdate(_engine, _delta) {
        if (localStorage.getItem(this.name) === "false") {
            this.kill();
        }
    }
}