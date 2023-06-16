import {BoundingBox, CollisionType, Input, resetObsoleteCounter, Scene, Vector} from "excalibur"
import { Player } from "../Characters/Player"
import { Resources } from "../../resources"
import {Inventory} from "../Items/Inventory/Inventory.js";
import {SlingShot} from "../Items/Shooter/SlingShot.js";
import {Shooter} from "../Items/Shooter/Shooter.js";
import { WoodCollectable } from "../Items/Collectables/WoodCollectable";
import { BackGround } from "../StaticComponents/background";

export class GameScene extends Scene {

    constructor() {
        super()
        console.log('this is a game')
        this.add(new BackGround('background', new Vector(0,0), 1000, 700, 1, 1, Resources.BackGround, CollisionType.PreventCollision, new Vector(0.1, 0.1)))
        this.add(new BackGround('background', new Vector(-1000, -700), 1000, 700, 1, 1, Resources.BackGround, CollisionType.PreventCollision, new Vector(0.1, 0.1)))
        this.add(new BackGround('background', new Vector(-1000, 0), 1000, 700, 1, 1, Resources.BackGround, CollisionType.PreventCollision, new Vector(0.1, 0.1)))
        this.add(new BackGround('background', new Vector(0,- 700), 1000, 700, 1, 1, Resources.BackGround, CollisionType.PreventCollision, new Vector(0.1, 0.1)))
        this.add(new BackGround('background', new Vector(1000, 700), 1000, 700, 1, 1, Resources.BackGround, CollisionType.PreventCollision, new Vector(0.1, 0.1)))
        this.add(new BackGround('background', new Vector(1000, 0), 1000, 700, 1, 1, Resources.BackGround, CollisionType.PreventCollision, new Vector(0.1, 0.1)))
        this.add(new BackGround('background', new Vector(0,700), 1000, 700, 1, 1, Resources.BackGround, CollisionType.PreventCollision, new Vector(0.1, 0.1)))
        //todo ,make hay below
        this.add(new BackGround('background', new Vector(-1000, 700), 1000, 700, 1, 1, Resources.Hay, CollisionType.PreventCollision, new Vector(0.1, 0.1)))
        this.add(new BackGround('background', new Vector(1000, -700), 1000, 700, 1, 1, Resources.BackGround, CollisionType.PreventCollision, new Vector(0.1, 0.1)))
        //this.add(new Player('player', 10, new Vector(150, 150), 100, 100, 1, 1, Resources.Fish, CollisionType.Active ));
        this.add(new Inventory(new Vector(visualViewport.width/2, (screen.height - 200))));
        this.add(new WoodCollectable('slingshot', new Vector(300, 500), 50, 50, 1, 1, Resources.Wood, CollisionType.Passive))
    }

    onInitialize(engine) {
        this.game = engine;
        this.camera.strategy.elasticToActor(this.game.player, 0.1, 0.3);
        let boundingBox = new BoundingBox(
            -1500,
            -1050,
            1500,
            1050
          )
          this.camera.strategy.limitCameraBounds(boundingBox);

    }

    onPreUpdate(engine, delta) {

        this.add(this.game.player)

    }

    onActivate(ctx) {
        this.game.scene = "game";
        localStorage.clear()
    }

    onPostUpdate(engine, _delta) {
        if(this.game.player.isKilled()){
            engine.goToScene('endScene')
        }
    }

}