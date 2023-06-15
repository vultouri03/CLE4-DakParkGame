import {Character} from "./Character.js";
import {ActionSequence, randomIntInRange} from "excalibur";
import {EggDropAttackPattern} from "./AttackPatterns/EggDropAttackPattern.js";
import {IdleAttackPattern} from "./AttackPatterns/IdleAttackPattern.js";
import {JumpAttackPattern} from "./AttackPatterns/JumpAttackPattern.js";

export class Boss extends Character {
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

        this.initAnimations(_engine);
        this.actions.runAction(this.actionSequence);
    }

    movement(_engine) {
        if (this.actionSequence.isComplete()) {
            // this.initAnimations(_engine);
            this.actions.runAction(this.actionSequence);
        }
    }

    onPostUpdate(_engine, _delta) {
        super.onPostUpdate(_engine, _delta);
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
}