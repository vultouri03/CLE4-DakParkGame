import {Resources} from "../../../../../resources.js";
import {ActionSequence, Animation, EasingFunctions, Vector} from "excalibur";

import {AttackPattern} from "../AttackPattern.js";

const SPRITE_DURATION = 350

export class BunnyJumpAttackPattern extends AttackPattern {

    direction;
    directionFacing;
    amountOfMovement = 200;

    sprites_amount = 7;

    constructor(enemy) {
        super(enemy);
        this.direction = {
            Up: 1,
            Down: 2,
            Left: 3,
            Right: 4,
        };
    }

    initGraphics() {
        this.bossAnimation = new Animation({
            frames: [
                {
                    graphic: Resources.AggressiveBunny.toSprite(),
                    duration: SPRITE_DURATION,
                },
                {
                    graphic: Resources.RunningBunny1.toSprite(),
                    duration: SPRITE_DURATION,
                },
                {
                    graphic: Resources.RunningBunny2.toSprite(),
                    duration: SPRITE_DURATION,
                },
                {
                    graphic: Resources.RunningBunny3.toSprite(),
                    duration: SPRITE_DURATION,
                },
                {
                    graphic: Resources.RunningBunny4.toSprite(),
                    duration: SPRITE_DURATION,
                },
                {
                    graphic: Resources.RunningBunny5.toSprite(),
                    duration: SPRITE_DURATION,
                },
                {
                    graphic: Resources.RunningBunny6.toSprite(),
                    duration: SPRITE_DURATION,
                },
                {
                    graphic: Resources.RunningBunny7.toSprite(),
                    duration: SPRITE_DURATION,
                },
            ]
        })
    }

    initAnimations(enemy ,_engine) {
        this.actionSequence = new ActionSequence(enemy, ctx => {
            enemy.graphics.use(this.bossAnimation);
            ctx.delay(SPRITE_DURATION);

            let movingDirection = new Vector(_engine.player.pos.x - enemy.pos.x, _engine.player.pos.y - enemy.pos.y);
            let distanceToCover = this.amountOfMovement / (enemy.distance * this.sprites_amount);

            for (let i = 0; i < this.sprites_amount; i++) {
                ctx.easeTo(new Vector( i * movingDirection.x * distanceToCover + enemy.pos.x, i * movingDirection.y * distanceToCover + enemy.pos.y), SPRITE_DURATION, EasingFunctions.EaseInQuad);
            }

            if (movingDirection.x < 0) {
                this.directionFacing = this.direction.Left;
            } else if (movingDirection.x > 0) {
                this.directionFacing = this.direction.Right;
            }

            if (this.directionFacing === this.direction.Left) {
            this.bossAnimation.flipHorizontal = true;
            } else if (this.directionFacing === this.direction.Right) {
                this.bossAnimation.flipHorizontal = false;
            }

            this.duration = SPRITE_DURATION * 8;
        })
    }

}