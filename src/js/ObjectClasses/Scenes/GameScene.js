import {CollisionType, Input, Scene, Vector} from "excalibur"
import { Resources } from "../../resources"
import {Inventory} from "../Items/Inventory/Inventory.js";
import {SlingShot} from "../Items/Shooter/SlingShot.js";
import {Shooter} from "../Items/Shooter/Shooter.js";
import {Bunny} from "../Characters/Enemy/Bunny.js";

export class GameScene extends Scene {
player;

    constructor(player) {
        super()
        console.log('this is a game')
        this.player = player
        
        //this.add(new Player('player', 10, new Vector(150, 150), 100, 100, 1, 1, Resources.Fish, CollisionType.Active ));
        this.add(new Inventory(new Vector(visualViewport.width / 2, (visualViewport.height - 100))));
    }

    onInitialize(engine) {
        this.game = engine;
        engine.add(this.player)

        this.sling = new SlingShot()
        engine.add(this.sling)

        let bunny = new Bunny("bunny", 10, new Vector(500, 500), 80, 80, 1, 1, Resources.CalmBunny, CollisionType.Passive);
        engine.add(bunny)
    }



onPreUpdate(engine, delta) {
    if (engine.input.keyboard.wasPressed(Input.Keys.Space)) {
        engine.add(new Shooter(this.sling.pos.x + 10, this.sling.pos.y - 85))
    }

}


}