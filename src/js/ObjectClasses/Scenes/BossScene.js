import {ActionSequence, CollisionType, Scene, Vector} from "excalibur"
import {Boss} from "../Characters/Enemy/Boss.js";
import {Resources} from "../../resources.js";
import {RockCollectable} from "../Items/Collectables/RockCollectable.js";
import {SlingshotCollectable} from "../Items/Collectables/SlingshotCollectable.js";
import { BackGround } from "../StaticComponents/background.js";

export class BossScene extends Scene {
    player;
    boss;
    rockSpawn;

    minimumDistanceBetweenRockAndBoss = this.distanceBetweenObjects(200, 200, 50, 50);

    constructor(player, nextScene, inventory) {
        super()
        this.add(new BackGround('BossBackGround' , new Vector(700,350), visualViewport.width + 100, visualViewport.height + 50, 1, 1, Resources.BossBackGround, CollisionType.PreventCollision))
        this.boss = new Boss("chicken boss", 10, new Vector(500, 300), 200, 200, 1, 1, Resources.Boss, CollisionType.Passive, nextScene);
        this.add(this.boss);

        //this.player = player;
        //this.add(this.player);

        this.add(inventory);

        this.initSpawns(this.game);

        
        
    }

    onInitialize(engine) {
        this.game = engine;
        this.game.scene = "Boss";
    }

    onPostUpdate(_engine, _delta) {
        this.movement(_engine)
    }

    onActivate(ctx) {
        this.add(this.game.player)
        this.game.player.pos = new Vector(0, 0);

        if (localStorage.getItem("slingshot") !== "true") {
            // als er geen slingshot is dan
            this.add(new SlingshotCollectable('slingshot', new Vector(this.game.player.pos.x + 50, this.game.player.pos.y + 150), 75, 75, 1, 1, Resources.Slingshot, CollisionType.Passive));
    }
}

    movement(_engine) {
        if (this.rockSpawn.isComplete()) {
            this.initSpawns(_engine);
        }
    }

    initSpawns(_engine) {
        let rockPosition = new Vector(this.getRandomInt(0, this.boss.pos.x), this.getRandomInt(0, visualViewport.height));

        while (this.areObjectsTooClose(rockPosition, this.boss.pos, this.minimumDistanceBetweenRockAndBoss)) {
            rockPosition = new Vector(this.getRandomInt(0, this.boss.pos.x), this.getRandomInt(0, visualViewport.height));
        }

        let rock = new RockCollectable('rock', rockPosition, 60, 60, 1, 1, Resources.Rock, CollisionType.Passive);

        let delay = this.getRandomInt(20, 30);

        this.rockSpawn =  new ActionSequence(rock, ctx => {
            ctx.delay(delay*1000);
            this.add(rock);
        })

        rock.actions.runAction(this.rockSpawn);
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }

    areObjectsTooClose(rock, boss, size) {
        return Math.abs(rock.x - boss.x) < size && Math.abs(rock.y - boss.y) < size;
    }

    distanceBetweenObjects(width, height, otherWidth, otherHeight) {
        return Math.max(width, height) / 2 + Math.max(otherWidth, otherHeight) / 2;
    }
}
