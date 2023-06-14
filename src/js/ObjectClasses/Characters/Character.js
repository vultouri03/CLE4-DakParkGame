import {Actor, Vector} from "excalibur";

export class Character extends Actor {
    name;
    hp;

    constructor(name, hp, width, height, spriteWidth, spriteHeight, resource, collisionType) {
        super({
            height: resource.height/spriteHeight,
            width: resource.width/spriteWidth,
            collisionType: collisionType,
        });

        this.name = name;
        this.hp = hp;
        this.scale = new Vector(width / (resource.width / spriteWidth), height / (resource.height / spriteHeight));
    }

    movement() {
        throw new Error("Movement is an abstract function and must be implemented.");
    }

    _onPostupdate() {
        this.movement();
    }
}