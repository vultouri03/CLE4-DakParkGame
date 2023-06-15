import {Actor, Vector} from "excalibur";
import { Resources } from '../../../resources.js'
import {Player} from "../../Characters/Player.js";


export class Shooter extends Actor {
    constructor(x,y) {
        super({width: 25, height: 25})
        this.pos= new Vector(x, y)
    }

    onInitialize(engine) {
        this.game=engine
        this.graphics.use(Resources.Rock.toSprite())
        this.scale = new Vector(2, 2)
        if(this.game.player.direction === 1){
        this.vel= new Vector(500 , 0)
        }else if (this.game.player.direction === 2){
            this.vel= new Vector(0 , 500)
        } else if (this.game.player.direction === 3) {
            this.vel = new Vector(-500, 0)
        }else if (this.game.player.direction === 4) {
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
