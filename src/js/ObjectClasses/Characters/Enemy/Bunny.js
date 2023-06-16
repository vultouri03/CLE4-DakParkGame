import {Enemy} from "./Enemy.js";
import {Resources} from "../../../resources.js";
import {ActionSequence} from "excalibur";
import {BunnyJumpAttackPattern} from "./AttackPatterns/Bunny/BunnyJumpAttackPattern.js";

export class Bunny extends Enemy {
    actionSequence;
    jumpAttackPattern;
    sprites;
    distance = 300;
    actionSequenceHasStarted
    constructor(name, hp, position, width, height, horizontalSpriteAmount, verticalSpriteAmount, resource, collisionType) {
        super(name, hp, position, width, height, horizontalSpriteAmount, verticalSpriteAmount, resource, collisionType);
        this.sprites = [Resources.RunningBunny1, Resources.RunningBunny2, Resources.RunningBunny3, Resources.RunningBunny4, Resources.RunningBunny5, Resources.RunningBunny6, Resources.RunningBunny7];

    }

    onInitialize(_engine) {
        this.jumpAttackPattern = new BunnyJumpAttackPattern(this);
        this.actionSequenceHasStarted = false;
        super.onInitialize(_engine);
    }

    onPostUpdate(_engine, _delta) {
        if (this.isPlayerClose(this.pos, _engine.player.pos) && !this.actionSequenceHasStarted) {
            this.actionSequenceHasStarted = true;
            this.initAnimations(_engine);
            this.actions.runAction(this.actionSequence);
        }

        super.onPostUpdate(_engine, _delta)
    }

    initAnimations(_engine) {
        this.actionSequence = new ActionSequence(this, ctx => {
            this.jumpAttackPattern.start(this, _engine);
            ctx.delay(1);
        });
    }

    isPlayerClose(bunnyPosition, playerPosition) {
        return Math.abs(bunnyPosition.x - playerPosition.x) < this.distance && Math.abs(bunnyPosition.y - playerPosition.y) < this.distance;
    }

    movement(_engine) {
        if (this.isPlayerClose(this.pos, _engine.player.pos) && this.actionSequence.isComplete()) {
            this.initAnimations(_engine);
            this.actions.runAction(this.actionSequence);

        } else if (!this.isPlayerClose(this.pos, _engine.player.pos) && this.actionSequenceHasStarted && this.actionSequence.isComplete()) {
            this.graphics.use(Resources.CalmBunny.toSprite());
        }
    }
}