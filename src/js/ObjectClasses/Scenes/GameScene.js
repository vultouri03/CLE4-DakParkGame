import {CollisionType, Input, Scene, Vector} from "excalibur"
import { Player } from "../Characters/Player"
import { Resources } from "../../resources"
import {Inventory} from "../Items/Inventory/Inventory.js";
import {SlingShot} from "../Items/Shooter/SlingShot.js";
import {Shooter} from "../Items/Shooter/Shooter.js";

export class GameScene extends Scene {

    constructor() {
        super()
        console.log('this is a game')
        
        //this.add(new Player('player', 10, new Vector(150, 150), 100, 100, 1, 1, Resources.Fish, CollisionType.Active ));
        this.add(new Inventory(new Vector(visualViewport.width/2, (screen.height - 200))));
    }

    onInitialize(engine) {
        this.game = engine;
        this.add(this.game.player)

        this.sling = new SlingShot()
        this.add(this.sling)
    }



onPreUpdate(engine, delta) {
    if (engine.input.keyboard.wasPressed(Input.Keys.Space)) {
        engine.add(new Shooter(this.sling.pos.x + 10, this.sling.pos.y - 85))
    }

}


}