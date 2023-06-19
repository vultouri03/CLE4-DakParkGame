import {Player} from "../Player.js";
import {Character} from "../Character.js";

export class Enemy extends Character {
    constructor(name, hp, position, width, height, horizontalSpriteAmount, verticalSpriteAmount, resource, collisionType) {
        super(name, hp, position, width, height, horizontalSpriteAmount, verticalSpriteAmount, resource, collisionType);
    }

    onInitialize(_engine) {
        this.on('collisionstart', (event) => this.hitSomething(event))
    }

    hitSomething(event) {
        if (event.other instanceof Player) {
            event.other.kill()
        }
    }
}