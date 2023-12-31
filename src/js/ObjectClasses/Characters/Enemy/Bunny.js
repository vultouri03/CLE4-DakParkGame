import {Enemy} from "./Enemy.js";
import {Resources} from "../../../resources.js";
import {ActionSequence} from "excalibur";
import {BunnyJumpAttackPattern} from "./AttackPatterns/Bunny/BunnyJumpAttackPattern.js";

export class Bunny extends Enemy {
    direction;
    distance = 300;
    directionFacing;

    sprites;
    actionSequence;
    actionSequenceHasStarted;
    jumpAttackPattern;


    constructor(name, hp, position, width, height, horizontalSpriteAmount, verticalSpriteAmount, resource, collisionType) {
        super(name, hp, position, width, height, horizontalSpriteAmount, verticalSpriteAmount, resource, collisionType);
        this.sprites = [Resources.RunningBunny1, Resources.RunningBunny2, Resources.RunningBunny3, Resources.RunningBunny4, Resources.RunningBunny5, Resources.RunningBunny6, Resources.RunningBunny7];
        this.direction = {
            Up: 1,
            Down: 2,
            Left: 3,
            Right: 4,
        };
    }

    onInitialize(_engine) {
        this.jumpAttackPattern = new BunnyJumpAttackPattern(this);
        this.actionSequenceHasStarted = false;
        super.onInitialize(_engine);
        this.on('collisionstart', (event) => this.hitSomething(event))
    }

    onPostUpdate(_engine, _delta) {
        if (this.isPlayerClose(this.pos, _engine.player.pos) && !this.actionSequenceHasStarted) {
            this.actionSequenceHasStarted = true;
            this.initAnimations(_engine);
            this.actions.runAction(this.actionSequence);
        }

        super.onPostUpdate(_engine, _delta)
        this.death();
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

            if (this.vel.x < 0) {
                this.directionFacing = this.direction.Left;
            } else if (this.vel.x > 0) {
                this.directionFacing = this.direction.Right;
            }

            if (this.directionFacing === this.direction.Left) {
                Resources.CalmBunny.toSprite().flipHorizontal = true;
            } else if (this.directionFacing === this.direction.Right) {
                Resources.CalmBunny.toSprite().flipHorizontal = false;
            }
            this.graphics.use(Resources.CalmBunny.toSprite());
        }
    }
}