import {ActionSequence, randomIntInRange, Vector} from "excalibur";
import {EggDropAttackPattern} from "./AttackPatterns/Boss/EggDropAttackPattern.js";
import {IdleAttackPattern} from "./AttackPatterns/Boss/IdleAttackPattern.js";
import {JumpAttackPattern} from "./AttackPatterns/Boss/JumpAttackPattern.js";
import {Enemy} from "./Enemy.js";

export class Boss extends Enemy {
    actionSequence;
    idleAttackPattern;
    jumpAttackPattern;
    eggDropAttackPattern;

    nextScene;
    game;

    constructor(name, hp, position, width, height, horizontalSpriteAmount, verticalSpriteAmount, resource, collisionType, nextScene) {
        super(name, hp, position, width, height, horizontalSpriteAmount, verticalSpriteAmount, resource, collisionType);
        this.nextScene = nextScene;
    }

    onInitialize(_engine) {
        this.game = _engine;
        this.idleAttackPattern = new IdleAttackPattern(this);
        this.jumpAttackPattern = new JumpAttackPattern(this);
        this.eggDropAttackPattern = new EggDropAttackPattern(this, _engine);

        super.onInitialize(_engine);

        this.actions.delay(1000);

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

    onPreKill(_scene) {
        localStorage.setItem("bossIsKilled", "true");
        this.player.pos = new Vector(150, 150);
        this.game.goToScene(this.nextScene);
    }
}