import {CollisionType, Scene, Vector} from "excalibur"
import {Boss} from "../Characters/Boss.js";
import {Resources} from "../../resources.js";
import {Player} from "../Characters/Player.js";

export class BossScene extends Scene {

    constructor() {
        super()
        this.add(new Boss("chicken boss", 10,  new Vector(300, 300), 200, 200, 1, 1, Resources.Boss, CollisionType.Active));
        this.add(new Player("player", 25, new Vector(150, 150), 100, 100, 1, 1, Resources.Fish, CollisionType.Active));
    }
}