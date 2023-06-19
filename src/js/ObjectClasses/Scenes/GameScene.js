import {BoundingBox, CollisionType, Random, Scene, Vector} from "excalibur"
import { Resources } from "../../resources"
import {Inventory} from "../Items/Inventory/Inventory.js";
import {Bunny} from "../Characters/Enemy/Bunny.js";
import { WoodCollectable } from "../Items/Collectables/WoodCollectable";
import { BackGround } from "../StaticComponents/background";
import {HammerCollectable} from "../Items/Collectables/HammerCollectable.js";
import {RockCollectable} from "../Items/Collectables/RockCollectable.js";
import {NailCollectable} from "../Items/Collectables/NailCollectable.js";
import {SlingshotCollectable} from "../Items/Collectables/SlingshotCollectable.js";

export class GameScene extends Scene {
    random;
    game;
    nextScene;

    constructor(player, nextScene) {
        super()
        this.player = player;

        this.add(new Inventory(new Vector(visualViewport.width / 2, (visualViewport.height - 100))));
        this.add(new BackGround('background', new Vector(0,0), 1000, 700, 1, 1, Resources.BackGround, CollisionType.PreventCollision, new Vector(0.1, 0.1)))
        this.add(new BackGround('background', new Vector(-1000, -700), 1000, 700, 1, 1, Resources.BackGround, CollisionType.PreventCollision, new Vector(0.1, 0.1)))
        this.add(new BackGround('background', new Vector(-1000, 0), 1000, 700, 1, 1, Resources.BackGround, CollisionType.PreventCollision, new Vector(0.1, 0.1)))
        this.add(new BackGround('background', new Vector(0,- 700), 1000, 700, 1, 1, Resources.BackGround, CollisionType.PreventCollision, new Vector(0.1, 0.1)))
        this.add(new BackGround('background', new Vector(1000, 700), 1000, 700, 1, 1, Resources.BackGround, CollisionType.PreventCollision, new Vector(0.1, 0.1)))
        this.add(new BackGround('background', new Vector(1000, 0), 1000, 700, 1, 1, Resources.BackGround, CollisionType.PreventCollision, new Vector(0.1, 0.1)))
        this.add(new BackGround('background', new Vector(0,700), 1000, 700, 1, 1, Resources.BackGround, CollisionType.PreventCollision, new Vector(0.1, 0.1)))
        this.add(new BackGround('background', new Vector(-1000, 700), 1000, 700, 1, 1, Resources.Hay, CollisionType.PreventCollision, new Vector(0.1, 0.1)))
        this.add(new BackGround('background', new Vector(1000, -700), 1000, 700, 1, 1, Resources.BackGround, CollisionType.PreventCollision, new Vector(0.1, 0.1)))
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

        this.add(new Inventory(new Vector(visualViewport.width / 2, (visualViewport.height - 100))));
        this.nextScene = nextScene;
    }

    onInitialize(engine) {
        this.game = engine;
        engine.add(this.player);

        let bunny = new Bunny("bunny", 10, new Vector(500, 500), 80, 80, 1, 1, Resources.CalmBunny, CollisionType.Passive);
        engine.add(bunny);

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

        if (localStorage.getItem("hammer") === "true" &&
            localStorage.getItem("nail") === "true" &&
            localStorage.getItem("wood") === "true") {
            engine.goToScene(this.nextScene);
        }
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