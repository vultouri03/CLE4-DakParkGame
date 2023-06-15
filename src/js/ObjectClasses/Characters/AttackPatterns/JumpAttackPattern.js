import {Resources} from "../../../resources.js";
import {ActionSequence, EasingFunctions, randomIntInRange, Vector} from "excalibur";
import {AttackPattern} from "./AttackPattern.js";

export class JumpAttackPattern extends AttackPattern {
    constructor(enemy) {
        super(enemy);
    }

    initGraphics() {
        this.bossAnimation = Resources.Boss.toSprite()
    }

    initAnimations(enemy) {
        let jumpDuration = 300;
        let horizontalDisplacement = 50;
        let jumpAmount = 4;
        this.duration = jumpDuration * jumpAmount;

        this.actionSequence = new ActionSequence(enemy, ctx => {
            let direction;

            const characterLeftSide = enemy.pos.x - enemy.width/2;
            const characterRightSide = enemy.pos.x + enemy.width/2;

            const horizontalMovementLeft = characterLeftSide - jumpAmount * horizontalDisplacement;
            const horizontalMovementRight = characterRightSide + jumpAmount * horizontalDisplacement;

            const leftSideOfScreen = 0;
            const rightSideOfScreen = visualViewport.width;

            if (horizontalMovementLeft < leftSideOfScreen) {
                direction = randomIntInRange(0, 1);
            } else if (horizontalMovementRight > rightSideOfScreen) {
                direction = randomIntInRange(-1, 0);
            } else {
                direction = randomIntInRange(-1, 1);
                // direction = 1;
            }

            ctx.easeBy(new Vector(horizontalDisplacement * direction, -25), jumpDuration, EasingFunctions.EaseInQuad);
            ctx.easeBy(new Vector(horizontalDisplacement * direction, -12), jumpDuration, EasingFunctions.EaseInQuad);
            ctx.easeBy(new Vector(horizontalDisplacement * direction,12), jumpDuration, EasingFunctions.EaseOutQuad);
            ctx.easeBy(new Vector(horizontalDisplacement * direction, 25), jumpDuration, EasingFunctions.EaseOutQuad);
        });
    }
}