import {Actor, Vector} from "excalibur";

export class Character extends Actor {
    name;
    hp;

    constructor(name, hp, position, width, height, horizontalSpriteAmount, verticalSpriteAmount, resource, collisionType) {
        super({
            pos: position,
            height: resource.height/verticalSpriteAmount,
            width: resource.width/horizontalSpriteAmount,
            collisionType: collisionType,
        });

        this.name = name;
        this.hp = hp;
        this.scale = new Vector(width / (resource.width / horizontalSpriteAmount), height / (resource.height / verticalSpriteAmount));
        this.graphics.use(resource.toSprite());
    }

    movement(_engine) {
        throw new Error("Movement is an abstract function and must be implemented.");
    }

    death() {
        if(this.hp <= 0) {
            this.kill();
        }
    }

    onPostUpdate(_engine, _delta) {
        this.movement(_engine);
    }
}