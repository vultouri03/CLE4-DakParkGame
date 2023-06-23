export class AttackPattern {
    enemy;
    duration;
    bossAnimation;
    actionSequence;
    sprites = [];

    constructor(enemy, _engine) {
        this.enemy = enemy;
        this.initGraphics();
    }

    initGraphics() {
        throw new Error("initGraphics is an abstract function and must be implemented.");
    }

    initAnimations(enemy, _engine) {
        throw new Error("initAnimations is an abstract function and must be implemented.");
    }

    start(enemy, _engine) {
        this.enemy.graphics.use(this.bossAnimation);
        this.initAnimations(enemy, _engine);
        this.enemy.actions.runAction(this.actionSequence);
    }
}