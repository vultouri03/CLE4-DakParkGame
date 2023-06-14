import {CollisionType, Scene, Vector} from "excalibur"
import {Boss} from "../Characters/Boss.js";
import {Resources} from "../../resources.js";
import {Player} from "../Characters/Player.js";
import {Inventory} from "../Items/Inventory/Inventory.js";

export class BossScene extends Scene {

    constructor() {
        super()
        this.add(new Boss("chicken boss", 10,  new Vector(300, 300), 200, 200, 1, 1, Resources.Boss, CollisionType.Passive));
        this.add(new Player("player", 25, new Vector(150, 150), 100, 100, 1, 1, Resources.Fish, CollisionType.Passive));
        this.add(new Inventory(new Vector(visualViewport.width/2, (screen.height - 200))));
    }
}