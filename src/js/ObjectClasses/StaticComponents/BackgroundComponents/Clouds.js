import {CollisionType, Random, Vector} from "excalibur";
import {Entity} from "../../Entity.js";

export class Clouds extends Entity {
    constructor(name, position, width, height, horizontalSpriteAmount, verticalSpriteAmount, resource) {
        super(name, position, width, height, horizontalSpriteAmount, verticalSpriteAmount, resource, CollisionType.PreventCollision)
    }

    onInitialize(engine) {

        let random = new Random();
        this.vel = new Vector(random.integer(20,50),0);
    }

    onPostUpdate(engine, delta) {
        if (this.pos.x > 1600) {
            this.pos = new Vector(-1600,-1200);
        }
    }
}