export class AttackPattern {
    enemy;
    duration;
    bossAnimation;
    actionSequence;

    constructor(enemy) {
        this.enemy = enemy;
        this.initGraphics();
        this.initAnimations(this.enemy);
    }

    initGraphics() {
        throw new Error("initGraphics is an abstract function and must be implemented.");
    }

    initAnimations(enemy) {
        throw new Error("initAnimations is an abstract function and must be implemented.");
    }

    start(enemy) {
        this.enemy.graphics.use(this.bossAnimation);
        this.initAnimations(enemy);
        this.enemy.actions.runAction(this.actionSequence);
    }
}