import {Input} from "excalibur";
import {Character} from "../../Characters/Character.js";
import {Entity} from "../../Entity.js";

export class Collectable extends Entity {

    constructor(name, position, width, height, horizontalSpriteAmount, verticalSpriteAmount, resource, collisionType) {
        super(name, position, width, height, horizontalSpriteAmount, verticalSpriteAmount, resource, collisionType);
    }

    onInitialize(engine) {
        this.on('precollision', (event) => {
            let isPressingInteractionKey = engine.input.keyboard.wasPressed(Input.Keys.E);
            let isPressingInterActionButton = engine.input.gamepads.at(0).isButtonPressed(Input.Buttons.Face1);
            if ((isPressingInteractionKey || isPressingInterActionButton) && event.other instanceof Character) {
                this.interAct(engine, event);
            }
        })

    }

    interAct(_engine, _event) {
        localStorage.setItem(this.name, "true");
        this.kill();
    }
}