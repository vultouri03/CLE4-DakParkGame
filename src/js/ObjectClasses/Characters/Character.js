import {Entity} from "../Entity.js";


export class Character extends Entity {
    hp;

    constructor(name, hp, position, width, height, horizontalSpriteAmount, verticalSpriteAmount, resource, collisionType) {
        super(name, position, width, height, horizontalSpriteAmount, verticalSpriteAmount, resource, collisionType);
        this.hp = hp;
    }

    movement(_engine) {
        throw new Error("Movement is an abstract function and must be implemented.");
    }

    death() {
        if (this.hp <= 0) {
            this.kill();
        }
    }

    onPostUpdate(_engine, _delta) {
        this.movement(_engine);
    }
}