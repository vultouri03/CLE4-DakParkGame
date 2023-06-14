import {Actor, Engine, Vector} from "excalibur";
import { ResourceLoader,Resources } from './resources.js'


export class Shooter extends Actor {
    constructor(x,y) {
        super({width: 25, height: 25})
        this.pos= new Vector(x, y)
    }

    onInitialize(engine) {

        this.graphics.use(Resources.Stone.toSprite())
        this.pos= new Vector(100, 100)
        this.vel= new Vector(50 , 0)
        this.on('collisionstart', (event) => this.hitSomething(event,engine))



    }
    hitSomething(event, engine){
        if (event.other instanceof Shooter) {
            console.log('raak')
            event.other.kill()
        }
    }

}
