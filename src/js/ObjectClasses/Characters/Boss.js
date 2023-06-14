import {Character} from "./Character.js";
import {Vector} from "excalibur";

export class Boss extends Character {
    constructor(name, hp, position, width, height, horizontalSpriteAmount, verticalSpriteAmount, resource, collisionType) {
        super(name, hp, position, width, height, horizontalSpriteAmount, verticalSpriteAmount, resource, collisionType);
        console.log("boss: " + resource)
    }

    movement(_engine) {
        this.vel = new Vector(-20, 20);
    }

    onPostUpdate(_engine, _delta) {
        super.onPostUpdate(_engine, _delta);
    }
}