import {Vector} from "excalibur";
import { Resources } from '../../../resources.js'
import {Entity} from "../../Entity.js";

export class Shooter extends Entity {
    game;

    constructor(name, position, width, height, horizontalSpriteAmount, verticalSpriteAmount, resource, collisionType) {
        super(name, position, width, height, horizontalSpriteAmount, verticalSpriteAmount, resource, collisionType);
    }

    onInitialize(engine) {
        this.game = engine;
        this.graphics.use(Resources.Rock.toSprite())
        this.scale = new Vector(2, 2)

        switch (this.game.player.directionFacing) {
            case this.game.player.direction.Right:
                this.vel = new Vector(500 , 0);
                break;
            case this.game.player.direction.Down:
                this.vel = new Vector(0, 500);
                break;
            case this.game.player.direction.Left:
                this.vel = new Vector(-500, 0);
                break;
            case this.game.player.direction.Up:
                this.vel = new Vector(0, -500);
                break;
        }

        this.on('collisionstart', (event) => this.hitSomething(event,engine))
    }


    hitSomething(event){
        if (event.other instanceof Shooter) {
            event.other.kill()
        }
    }

}
