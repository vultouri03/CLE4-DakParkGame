import {Vector} from "excalibur";

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
        this.scale = new Vector(2, 2)

        let rockVelX;
        let xPositionSlingShotIsLeftOfPlayer = engine.player.slingShot.pos.x < 0;
        let xPositionSlingShotIsRightOfPlayer = engine.player.slingShot.pos.x > 0;
        if (xPositionSlingShotIsLeftOfPlayer) {
            rockVelX = -this.rockVel;
        } else if (xPositionSlingShotIsRightOfPlayer) {
            rockVelX = this.rockVel;
        } else {
            rockVelX = 0;
        }

        let rockVelY;
        let yPositionSlingShotIsAbovePlayer = engine.player.slingShot.pos.y < 0;
        let yPositionSlingShotIsBelowPlayer = engine.player.slingShot.pos.y > 0;
        if (yPositionSlingShotIsAbovePlayer) {
            rockVelY = -this.rockVel;
        } else if (yPositionSlingShotIsBelowPlayer) {
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
            event.other.actions.blink(200, 200, 3);
            this.kill();
        }
    }
}
