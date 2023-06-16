import {Entity} from "../../Entity.js";
import {Character} from "../../Characters/Character.js";

export class Weapon extends Entity {
    constructor(name, position, width, height, horizontalSpriteAmount, verticalSpriteAmount, resource, collisionType) {
        super(name, position, width, height, horizontalSpriteAmount, verticalSpriteAmount, resource, collisionType);
    }

    onInitialize(engine) {
        this.on('collisionstart', (event) => this.hitSomething(event,engine))
    }

    hitSomething(event){
        if (event.other instanceof Character) {
            event.other.kill()
        }
    }
}