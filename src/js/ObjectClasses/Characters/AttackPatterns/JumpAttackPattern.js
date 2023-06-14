import {Resources} from "../../../resources.js";
import {ActionSequence, EasingFunctions, randomIntInRange, Vector} from "excalibur";
import {AttackPattern} from "./AttackPattern.js";

export class JumpAttackPattern extends AttackPattern {
    constructor(enemy) {
        super(enemy);
        this.initGraphics();
        this.initAnimations(this.enemy);
    }

    initGraphics() {
        this.bossAnimation = Resources.Boss.toSprite()
    }

    initAnimations(enemy) {
        let jumpDuration = 300;
        this.duration = jumpDuration * 4;
        this.actionSequence = new ActionSequence(enemy, ctx => {
            let direction = randomIntInRange(-1, 1);
            ctx.easeBy(new Vector(50 * direction, -25), jumpDuration, EasingFunctions.EaseInQuad);
            ctx.easeBy(new Vector(50 * direction, -12), jumpDuration, EasingFunctions.EaseInQuad);
            ctx.easeBy(new Vector(50 * direction,12), jumpDuration, EasingFunctions.EaseOutQuad);
            ctx.easeBy(new Vector(50 * direction, 25), jumpDuration, EasingFunctions.EaseOutQuad);
        });
    }
}