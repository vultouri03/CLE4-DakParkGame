import {Vector} from "excalibur";
import { Resources } from '../../../resources.js'
import {Weapon} from "./Weapon.js";

export class Shooter extends Weapon {
    game;
    direction;
    constructor(name, position, width, height, horizontalSpriteAmount, verticalSpriteAmount, resource, collisionType, direction) {
        super(name, position, width, height, horizontalSpriteAmount, verticalSpriteAmount, resource, collisionType);
        this.direction = direction;
    }

    onInitialize(engine) {
        this.game = engine;
        this.graphics.use(Resources.Rock.toSprite())
        this.scale = new Vector(2, 2)
        console.log(this.game.player.directionFacing)
        switch (this.direction) {
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
}
