import {Actor, CollisionType, Input, Vector} from "excalibur";
import {Character} from "./ObjectClasses/Characters/Character.js";

export class Collectable extends Actor {
    name;

    constructor(name, position, width, height, spriteWidth, spriteHeight, resource) {
        super({
            height: resource.height/spriteHeight,
            width: resource.width/spriteWidth,
        });

        this.body.collisionType = CollisionType.Passive;
        this.name = name;
        this.scale = new Vector(width / (resource.width / spriteWidth), height / (resource.height / spriteHeight));
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

    interAct(engine, event) {
        localStorage.setItem(this.name, "true");
        this.kill();
    }
}