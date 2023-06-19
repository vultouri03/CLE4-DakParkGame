import {Resources} from "../../../../../resources.js";
import {ActionSequence, Animation, EasingFunctions, Vector} from "excalibur";
import {AttackPattern} from "../AttackPattern.js";

const SPRITE_DURATION = 500

export class BunnyJumpAttackPattern extends AttackPattern {

    sprites_amount = 7
    constructor(enemy) {
        super(enemy);
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
            console.log("hello2")
            enemy.graphics.use(this.bossAnimation);
            ctx.delay(SPRITE_DURATION);

            let movingDirection = new Vector(_engine.player.pos.x - enemy.pos.x, _engine.player.pos.y - enemy.pos.y);
            let distanceToCover = _engine.player.velocity / (enemy.distance * this.sprites_amount);
            for (let i = 0; i < this.sprites_amount; i++) {
                console.log("hello3")
                ctx.easeTo(new Vector( i * movingDirection.x * distanceToCover + enemy.pos.x, i * movingDirection.y * distanceToCover + enemy.pos.y), SPRITE_DURATION, EasingFunctions.EaseInQuad);
            }
            this.duration = SPRITE_DURATION * 8;
        })
    }

}