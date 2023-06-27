import {Weapon} from "./Weapon.js";
import {Player} from "../../Characters/Player.js";

export class BossWeapon extends Weapon {
    constructor(name, position, width, height, horizontalSpriteAmount, verticalSpriteAmount, resource, collisionType) {
        super(name, position, width, height, horizontalSpriteAmount, verticalSpriteAmount, resource, collisionType);
    }

    hitSomething(event, engine){
        if (event.other instanceof Player) {
            event.other.hp -= 1;
            event.other.actions.blink(200, 200, 3)
        }
    }
}