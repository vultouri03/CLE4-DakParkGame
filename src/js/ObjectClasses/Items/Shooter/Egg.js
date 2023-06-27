import {Weapon} from "./Weapon.js";
import {CollisionType, Entity, Vector} from "excalibur";
import {Resources} from "../../../resources.js";
import {BossWeapon} from "./BossWeapon.js";

export class Egg extends Weapon {
    shadow;

    constructor(name, position, width, height, horizontalSpriteAmount, verticalSpriteAmount, resource, collisionType, shadow) {
        super(name, position, width, height, horizontalSpriteAmount, verticalSpriteAmount, resource, collisionType);
        this.shadow = shadow;
    }

    hitSomething(event, engine) {
        if (event.other instanceof Entity && event.other.name === this.shadow.name) {
            let friedEgg = new BossWeapon('friedEgg', new Vector(this.shadow.pos.x, this.shadow.pos.y), this.width, this.height, 1, 1, Resources.FriedEgg, CollisionType.Passive);
            engine.add(friedEgg);
            this.graphics.visible = false;
            friedEgg.actions.delay(700).die();
        }
    }
}