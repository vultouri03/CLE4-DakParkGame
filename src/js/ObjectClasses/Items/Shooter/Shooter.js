import {Actor, Vector} from "excalibur";
import { Resources } from '../../../resources.js'


export class Shooter extends Actor {
    constructor(x,y) {
        super({width: 25, height: 25})
        this.pos= new Vector(x, y)
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Rock.toSprite())
        this.scale = new Vector(2, 2)
        this.vel= new Vector(500 , 0)
        this.on('collisionstart', (event) => this.hitSomething(event,engine))
    }
    hitSomething(event){
        if (event.other instanceof Shooter) {
            // console.log('raak')
            event.other.kill()
        }
    }

}