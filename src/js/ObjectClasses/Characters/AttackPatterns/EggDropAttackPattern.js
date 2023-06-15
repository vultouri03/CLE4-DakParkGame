import {Resources} from "../../../resources.js";
import {SpriteSheet, Animation, ActionSequence} from "excalibur";
import {AttackPattern} from "./AttackPattern.js";

let sprite0, sprite1, sprite2;

export class EggDropAttackPattern extends AttackPattern {

    constructor(enemy) {
        super(enemy);
        this.initGraphics();
        this.initAnimations(this.enemy);
        this.duration = 1500;
    }

    initGraphics() {
        const spriteSheet = SpriteSheet.fromImageSource({
            image: Resources.EggPositionBoss,
            grid: {
                rows: 1,
                columns: 3,
                spriteWidth: Resources.EggPositionBoss.width/3,
                spriteHeight: Resources.EggPositionBoss.height,
            },
        });
        sprite0 = spriteSheet.getSprite(0, 0);
        if (!sprite0) return;
        sprite0.width = Resources.EggPositionBoss.width/3;
        sprite0.height = Resources.EggPositionBoss.height;
        sprite1 = spriteSheet.getSprite(1, 0);
        if (!sprite1) return;
        sprite1.width = Resources.EggPositionBoss.width/3;
        sprite1.height = Resources.EggPositionBoss.height;
        sprite2 = spriteSheet.getSprite(2, 0);
        if (!sprite2) return;
        sprite2.width = Resources.EggPositionBoss.width/3;
        sprite2.height = Resources.EggPositionBoss.height;

        this.bossAnimation = new Animation({
            frames: [
                {
                    graphic: sprite0,
                    duration: 500,
                },
                {
                    graphic: sprite1,
                    duration: 500,
                },
                {
                    graphic: sprite2,
                    duration: 500,
                },
            ]
        })

        this.enemy.graphics.use(this.bossAnimation);
    }

    initAnimations(enemy) {
        this.actionSequence = new ActionSequence(enemy, ctx => {
            ctx.delay(this.duration);
        })
    }
}