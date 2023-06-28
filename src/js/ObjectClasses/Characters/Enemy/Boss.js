import {ActionSequence, randomIntInRange, Vector} from "excalibur";

import {EggDropAttackPattern} from "./AttackPatterns/Boss/EggDropAttackPattern.js";
import {IdleAttackPattern} from "./AttackPatterns/Boss/IdleAttackPattern.js";
import {JumpAttackPattern} from "./AttackPatterns/Boss/JumpAttackPattern.js";
import {Enemy} from "./Enemy.js";
import {Player} from "../Player.js";


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

        this.initAnimations(_engine, 1);
        this.actions.runAction(this.actionSequence);
    }

    onPreUpdate() {
        this.death()
    }

    initAnimations(_engine, rand) {
        this.actionSequence = new ActionSequence(this, ctx => {

            rand = 2;
            if (rand === 1) {
                this.idleAttackPattern.start(this);
                ctx.delay(200);
            } else if (rand === 2) {
                this.eggDropAttackPattern.start(this, _engine);
                ctx.delay(200);
            } else {
                this.jumpAttackPattern.start(this);
                ctx.delay(200);
            }
        })
    }

    hitSomething(event){
        if (event.other instanceof Player) {
            event.other.hp -= 2;
            event.other.actions.blink(200, 200, 3);
        }
    }

    movement(_engine) {
        if (this.actionSequence.isComplete()) {
            this.initAnimations(_engine, randomIntInRange(1, 3));
            this.actions.runAction(this.actionSequence);
        }
    }

    onPreKill(_scene) {
        localStorage.setItem("bossIsKilled", "true");
        this.game.player.pos = new Vector(150, 150);
        this.game.goToScene('winScene');
    }
}