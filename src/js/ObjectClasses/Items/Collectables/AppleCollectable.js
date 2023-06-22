import {Input} from "excalibur";

import {Collectable} from "./Collectable.js";
import {Player} from "../../Characters/Player.js";

export class AppleCollectable extends Collectable {
    constructor(name, position, width, height, horizontalSpriteAmount, verticalSpriteAmount, resource, collisionType) {
        super(name, position, width, height, horizontalSpriteAmount, verticalSpriteAmount, resource, collisionType);
    }

    onInitialize(engine) {
        this.on('precollision', (event) => {

            let isPressingInteractionKey = engine.input.keyboard.wasPressed(Input.Keys.E);
            let isPressingInterActionButton = engine.input.gamepads.at(0).isButtonPressed(Input.Buttons.Face1);
            if ((isPressingInteractionKey || isPressingInterActionButton) && event.other instanceof Player) {
                this.heal(engine, event);
            }
        })
    }

    heal(engine, event){
        event.other.hp += 2;
        this.kill();
    }
}