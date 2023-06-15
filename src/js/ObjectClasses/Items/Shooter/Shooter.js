import {Actor, Vector} from "excalibur";
import { Resources } from '../../../resources.js'
import {Player} from "../../Characters/Player.js";



export class Shooter extends Actor {
    game;
    name;

    constructor(name, position, width, height, horizontalSpriteAmount, verticalSpriteAmount, resource, collisionType) {
        super({
            pos: position,
            height: resource.height/verticalSpriteAmount,
            width: resource.width/horizontalSpriteAmount,
            collisionType: collisionType,
        });

        this.name = name;
        this.scale = new Vector(width / (resource.width / horizontalSpriteAmount), height / (resource.height / verticalSpriteAmount));
        this.graphics.use(resource.toSprite());
        this.pos= position
    }

    onInitialize(engine) {
        this.game = engine;
        this.graphics.use(Resources.Rock.toSprite())
        this.scale = new Vector(2, 2)
        if(this.game.player.directionFacing === this.game.player.direction.Right){
            this.vel= new Vector(500 , 0)
        }else if (this.game.player.directionFacing === this.game.player.direction.Down){
            this.vel= new Vector(0 , 500)
        } else if (this.game.player.directionFacing === this.game.player.direction.Left) {
            this.vel = new Vector(-500, 0)
        }else if (this.game.player.directionFacing === this.game.player.direction.Up) {
            this.vel = new Vector(0, -500)
        }

        this.on('collisionstart', (event) => this.hitSomething(event,engine))
    }
    hitSomething(event){
        if (event.other instanceof Shooter) {
            // console.log('raak')
            event.other.kill()
        }
    }

}
