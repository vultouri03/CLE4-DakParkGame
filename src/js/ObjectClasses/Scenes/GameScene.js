import {BoundingBox, CollisionType, Input, resetObsoleteCounter, Scene, Vector} from "excalibur"
import { Player } from "../Characters/Player"
import { Resources } from "../../resources"
import {Inventory} from "../Items/Inventory/Inventory.js";
import {SlingShot} from "../Items/Shooter/SlingShot.js";
import {Shooter} from "../Items/Shooter/Shooter.js";
import { WoodCollectable } from "../Items/Collectables/WoodCollectable";
import { BackGround } from "../StaticComponents/background";
import {HammerCollectable} from "../Items/Collectables/HammerCollectable.js";
import {RockCollectable} from "../Items/Collectables/RockCollectable.js";
import {NailCollectable} from "../Items/Collectables/NailCollectable.js";
import {SlingshotCollectable} from "../Items/Collectables/SlingshotCollectable.js";

export class GameScene extends Scene {
    random;

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
        this.add(new BackGround('background', new Vector(-1000, 700), 1000, 700, 1, 1, Resources.Hay, CollisionType.PreventCollision, new Vector(0.1, 0.1)))
        this.add(new BackGround('background', new Vector(1000, -700), 1000, 700, 1, 1, Resources.BackGround, CollisionType.PreventCollision, new Vector(0.1, 0.1)))
        //this.add(new Player('player', 10, new Vector(150, 150), 100, 100, 1, 1, Resources.Fish, CollisionType.Active ));
        this.add(new Inventory(new Vector(visualViewport.width/2, (screen.height - 200))));
        this.add(new WoodCollectable('wood', new Vector(300, 500), 50, 50, 1, 1, Resources.Wood, CollisionType.Passive));
        this.add(new HammerCollectable('hammer', new Vector(-750, -500), 75,75, 1, 1, Resources.Hammer, CollisionType.Passive));
        this.random = new Random();
        for (let i = 0; i < 10; i++) {
            this.add(new RockCollectable('rock', new Vector(this.random.integer(-1300, 1300), this.random.integer(-950, 950)), 60,60, 1, 1, Resources.Rock, CollisionType.Passive));
        }

        for (let i = 0; i < 5; i++) {
            this.add(new NailCollectable('nail', new Vector(this.random.integer(-1500, -500), this.random.integer(350, 1050)), 25,25, 1, 1, Resources.Nail, CollisionType.Passive));
        }
        this.add(new SlingshotCollectable('slingshot', new Vector(100, 800), 75,75, 1, 1, Resources.Slingshot, CollisionType.Passive));



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
    }

    onPostUpdate(engine, _delta) {
        if(this.game.player.isKilled()){
            engine.goToScene('endScene')
        }
    }

}