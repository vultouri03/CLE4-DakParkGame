import {Resources} from "../../../../../resources.js";
import {ActionSequence, randomIntInRange} from "excalibur";
import {AttackPattern} from "../AttackPattern.js";

export class IdleAttackPattern extends AttackPattern {

    constructor(enemy) {
        super(enemy);
    }

    initGraphics() {
        this.bossAnimation = Resources.Boss.toSprite()
    }

    initAnimations(enemy) {
        this.actionSequence = new ActionSequence(enemy, ctx => {
            this.duration = randomIntInRange(2, 5)*100;
            ctx.delay(this.duration);
        })
    }

}