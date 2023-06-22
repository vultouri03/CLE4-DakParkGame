import {Vector} from "excalibur";
import { Resources } from '../../../resources.js'
import {Weapon} from "./Weapon.js";
import {Enemy} from "../../Characters/Enemy/Enemy.js";


export class Shooter extends Weapon {
    game;
    rockVel = 500;
    constructor(name, position, width, height, horizontalSpriteAmount, verticalSpriteAmount, resource, collisionType) {
        super(name, position, width, height, horizontalSpriteAmount, verticalSpriteAmount, resource, collisionType);
    }

    onInitialize(engine) {
        this.game = engine;
        this.graphics.use(Resources.Rock.toSprite())
        this.scale = new Vector(2, 2)

        let rockVelX;
        if (engine.player.slingShot.pos.x < 0) {
            rockVelX = -this.rockVel;
        } else if (engine.player.slingShot.pos.x > 0) {
            rockVelX = this.rockVel;
        } else {
            rockVelX = 0;
        }

        let rockVelY;
        if (engine.player.slingShot.pos.y < 0) {
            rockVelY = -this.rockVel;
        } else if (engine.player.slingShot.pos.y > 0) {
            rockVelY = this.rockVel;
        } else {
            rockVelY = 0;
        }

        this.vel = new Vector(rockVelX, rockVelY);
        this.on('collisionstart', (event) => this.hitSomething(event, engine))
    }

    hitSomething(event) {
        if (event.other instanceof Enemy) {
            event.other.hp -= 5;
        }
    }
}
