import {CollisionType, Scene, Vector} from "excalibur"
import {Boss} from "../Characters/Enemy/Boss.js";
import {Resources} from "../../resources.js";
import {Inventory} from "../Items/Inventory/Inventory.js";

export class BossScene extends Scene {
    player;

    constructor(player, nextScene) {
        super()
        this.add(new Boss("chicken boss", 10, new Vector(500, 300), 200, 200, 1, 1, Resources.Boss, CollisionType.Passive, nextScene));
        this.player = player;
        this.add(this.player);
        this.add(new Inventory(new Vector(visualViewport.width / 2, (visualViewport.height - 100))));
    }
    onInitialize(engine) {
        this.game = engine;
        this.game.scene = "Boss";
    }

}