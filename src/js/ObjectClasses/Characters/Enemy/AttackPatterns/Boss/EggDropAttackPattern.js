import {Resources} from "../../../../../resources.js";
import {
    SpriteSheet,
    Animation,
    ActionSequence,
    randomIntInRange,
    Vector,
    CollisionType,
    ParallelActions
} from "excalibur";

import {AttackPattern} from "../AttackPattern.js";
import {Entity} from "../../../../Entity.js";
import {Egg} from "../../../../Items/Shooter/Egg.js";

const SPRITE_AMOUNT = 3;
const SPRITE_DURATION = 500;
const EGG_FALL_DURATION =900;
const EGG_SIZE = 80;

const leftSideOfScreen = EGG_SIZE/2;
const rightSideOfScreen = visualViewport.width - EGG_SIZE/2;
const topOfScreen = EGG_SIZE/2;
const bottomOfScreen = visualViewport.height - EGG_SIZE/2;

export class EggDropAttackPattern extends AttackPattern {
    shadows = [];
    eggs = [];

    constructor(enemy, _engine) {
        super(enemy, _engine);
        this.duration = EGG_FALL_DURATION * 2;
    }

    initGraphics() {
        const spriteSheet = SpriteSheet.fromImageSource({
            image: Resources.EggPositionBoss,
            grid: {
                rows: 1,
                columns: SPRITE_AMOUNT,
                spriteWidth: Resources.EggPositionBoss.width / SPRITE_AMOUNT,
                spriteHeight: Resources.EggPositionBoss.height,
            },
        });

        for (let i = 0; i < SPRITE_AMOUNT; i++) {
            this.sprites[i] = spriteSheet.getSprite(i, 0);
            this.sprites[i].width = Resources.EggPositionBoss.width / SPRITE_AMOUNT;
            this.sprites[i].height = Resources.EggPositionBoss.height;

            if (!this.sprites[i]) return;
        }


        this.bossAnimation = new Animation({
            frames: [
                {
                    graphic: this.sprites[0],
                    duration: SPRITE_DURATION,
                },
                {
                    graphic: this.sprites[1],
                    duration: SPRITE_DURATION,
                },
                {
                    graphic: this.sprites[2],
                    duration: SPRITE_DURATION,
                },
            ]
        })

        this.enemy.graphics.use(this.bossAnimation);
    }

    initAnimations(enemy, _engine) {
        this.actionSequence = new ActionSequence(enemy, ctx => {
            this.eggDropSequence(_engine, enemy);
            this.eggCleanUp();
            ctx.delay(this.duration);
        })
    }

    eggActionSequence(egg, position, eggFallDuration) {
        return new ActionSequence(egg, ctx => {
            ctx.easeTo(new Vector(position.x, position.y - 10), eggFallDuration)
        })
    }

    eggDropSequence(_engine, enemy) {
        let shadowPosition, shadow, egg;

        for (let i = 0; i < 5; i++) {
            shadowPosition = new Vector(randomIntInRange(leftSideOfScreen, rightSideOfScreen), randomIntInRange(topOfScreen, bottomOfScreen));

                for (let j = 0; j < this.shadows.length; j++) {
                    if (this.areObjectsTooClose(this.shadows[j].pos, shadowPosition, EGG_SIZE) || this.areObjectsTooClose(shadowPosition, enemy.pos, enemy.width)) {
                        shadowPosition = new Vector(randomIntInRange(leftSideOfScreen, rightSideOfScreen), randomIntInRange(topOfScreen, bottomOfScreen));
                        j = -1;
                    }
                }

            shadow = new Entity('eggShadow' + i, shadowPosition, 40, 40, 1, 1, Resources.Target, CollisionType.Passive);
            _engine.add(shadow);

            let rotateShadowSequence = new ActionSequence(shadow, ctx => {
                ctx.rotateTo(1/6, 500);
            });

            let scaleShadowSequence = new ActionSequence(shadow, ctx => {
                ctx.scaleBy(new Vector(.03, .03), .04);
            });

            shadow.actions.runAction(new ParallelActions([rotateShadowSequence, scaleShadowSequence]));
            this.shadows[i] = shadow;
        }

        for (let i = 0; i < 5; i++) {
            egg = new Egg('egg', new Vector(this.shadows[i].pos.x, 0), EGG_SIZE, EGG_SIZE, 1, 1, Resources.Egg, CollisionType.Passive, this.shadows[i]);
            this.eggs[i] = egg;
            _engine.add(egg);
            egg.actions.runAction(this.eggActionSequence(egg, this.shadows[i].pos, EGG_FALL_DURATION));
        }

    }

    eggCleanUp() {
        for (let i = 0; i < 5; i++) {
            this.eggs[i].actions.delay(EGG_FALL_DURATION).die();
            this.shadows[i].actions.delay(EGG_FALL_DURATION).die();
        }
    }

    areObjectsTooClose(egg, other, size) {
        return Math.abs(egg.x - other.x) < size && Math.abs(egg.y - other.y) < size;
    }
}