import {Actor, Input, Vector} from "excalibur";
import {Character} from "../../Characters/Character.js";

export class Collectable extends Actor {
    name;

    constructor(name, position, width, height, horizontalSpriteAmount, verticalSpriteAmount, resource, collisionType) {
        super({
            height: resource.height/verticalSpriteAmount,
            width: resource.width/horizontalSpriteAmount,
            collisionType: collisionType,
        });
        this.pos = position;
        this.name = name;
        this.scale = new Vector(width / (resource.width / horizontalSpriteAmount), height / (resource.height / verticalSpriteAmount));
        this.graphics.use(resource.toSprite());
    }

    onInitialize(engine) {
        this.on('precollision', (event) => {
            let isPressingInteractionKey = engine.input.keyboard.wasPressed(Input.Keys.E);
            if (isPressingInteractionKey && event.other instanceof Character) {
                this.interAct(engine, event);
            }
        })
    }

    interAct(_engine, _event) {
        localStorage.setItem(this.name, "true");
        this.kill();
    }
}