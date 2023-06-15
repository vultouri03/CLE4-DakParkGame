import {Camera, CollisionType, Scene, Vector} from "excalibur"
import {Boss} from "../Characters/Boss.js";
import {Resources} from "../../resources.js";
import {Player} from "../Characters/Player.js";
import {Inventory} from "../Items/Inventory/Inventory.js";
import {WoodCollectable} from "../Items/Collectables/WoodCollectable.js";

export class BossScene extends Scene {
    player;

    constructor() {
        super()
        this.add(new WoodCollectable('wood', new Vector(300, 500), 50, 50, 1, 1, Resources.Wood, CollisionType.Passive))
        this.add(new Boss("chicken boss", 10, new Vector(300, 300), 200, 200, 1, 1, Resources.Boss, CollisionType.Passive));
        this.player = new Player("player", 25, new Vector(150, 150), 100, 100, 1, 1, Resources.Fish, CollisionType.Passive)
        this.add(this.player);
        this.add(new Inventory(new Vector(visualViewport.width / 2, (visualViewport.height - 100))));
    }

    onInitialize(engine) {
        this.camera.strategy.elasticToActor(this.player, 0.1, 0.3);
    }
}