import {Collectable} from "./Collectable.js";

export class RockCollectable extends Collectable {
    constructor(name, position, width, height, horizontalSpriteAmount, verticalSpriteAmount, resource, collisionType) {
        super(name, position, width, height, horizontalSpriteAmount, verticalSpriteAmount, resource, collisionType);
    }

    interAct(_engine, _event) {
        if (_engine.player.ammunitionAmount === 0) {
            localStorage.setItem(this.name, "true");
        }
        if (_engine.player.ammunitionAmount < 9) {
            _engine.player.ammunitionAmount++;
            this.kill();
        }
    }
}