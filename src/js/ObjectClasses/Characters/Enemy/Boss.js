import {ActionSequence, randomIntInRange} from "excalibur";
import {EggDropAttackPattern} from "./AttackPatterns/Boss/EggDropAttackPattern.js";
import {IdleAttackPattern} from "./AttackPatterns/Boss/IdleAttackPattern.js";
import {JumpAttackPattern} from "./AttackPatterns/Boss/JumpAttackPattern.js";
import {Enemy} from "./Enemy.js";

export class Boss extends Enemy {
    actionSequence;
    idleAttackPattern;
    jumpAttackPattern;
    eggDropAttackPattern;

    constructor(name, hp, position, width, height, horizontalSpriteAmount, verticalSpriteAmount, resource, collisionType) {
        super(name, hp, position, width, height, horizontalSpriteAmount, verticalSpriteAmount, resource, collisionType);
    }

    onInitialize(_engine) {
        this.idleAttackPattern = new IdleAttackPattern(this);
        this.jumpAttackPattern = new JumpAttackPattern(this);
        this.eggDropAttackPattern = new EggDropAttackPattern(this, _engine);

        super.onInitialize(_engine);

        this.initAnimations(_engine);
        this.actions.runAction(this.actionSequence);
    }

    initAnimations(_engine) {
        this.actionSequence = new ActionSequence(this, ctx => {
            let rand = randomIntInRange(1, 3);

            // rand = 2;
            if (rand === 1) {
                this.idleAttackPattern.start(this);
                ctx.delay(this.idleAttackPattern.duration);
            } else if (rand === 2) {
                this.eggDropAttackPattern.start(this, _engine);
                ctx.delay(this.eggDropAttackPattern.duration);
            } else {
                this.jumpAttackPattern.start(this);
                ctx.delay(this.jumpAttackPattern.duration);
            }
        })
    }

    movement(_engine) {
        if (this.actionSequence.isComplete()) {
            this.initAnimations(_engine);
            this.actions.runAction(this.actionSequence);
        }
    }
}