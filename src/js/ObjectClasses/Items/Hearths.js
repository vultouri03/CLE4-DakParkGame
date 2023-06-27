import { Resources } from "../../resources";
import { UIElement } from "./UIElement";

export class Hearths extends UIElement {
    game;

    constructor(name, position, width, height, horizontalSpriteAmount, verticalSpriteAmount, resource, collisionType){
        super(name, position, width, height, horizontalSpriteAmount, verticalSpriteAmount, resource, collisionType)
    }

    onInitialize(engine) {
        this.game = engine;
        this.graphics.use(Resources.Heart4.toSprite())
        
    }

    onPreUpdate(engine) {
        switch(this.game.player.hp) {
            case 8: 
            this.graphics.use(Resources.Heart4.toSprite());
            break;
            case 6:
            this.graphics.use(Resources.Heart3.toSprite());
            break;
            case 4:
            this.graphics.use(Resources.Heart2.toSprite());
            break;
            case 2:
            this.graphics.use(Resources.Heart1.toSprite());
            break;

        }
    }
}