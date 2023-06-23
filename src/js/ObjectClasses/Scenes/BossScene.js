import {ActionSequence, CollisionType, Scene, Timer, Vector} from "excalibur"
import {Resources} from "../../resources.js";

import {Boss} from "../Characters/Enemy/Boss.js";
import {RockCollectable} from "../Items/Collectables/RockCollectable.js";
import {SlingshotCollectable} from "../Items/Collectables/SlingshotCollectable.js";
import {Background} from "../StaticComponents/Background/Background.js";

export class BossScene extends Scene {
    player;
    boss;
    rockSpawn;
    inventory;

    minimumDistanceBetweenRockAndBoss = this.distanceBetweenObjects(200, 200, 50, 50);

    constructor(player, nextScene, inventory) {
        super()
        this.add(new Background('BossBackGround' , new Vector(visualViewport.width/2, visualViewport.height/2), visualViewport.width + 100, visualViewport.height + 50, 1, 1, Resources.BossBackGround, CollisionType.PreventCollision));
        this.boss = new Boss("chicken boss", 30, new Vector(500, 300), 200, 200, 1, 1, Resources.Boss, CollisionType.Passive, nextScene);
        this.add(this.boss);
        this.inventory = inventory;

        //this.initSpawns(this.game);
        
    }

    onInitialize(engine) {
        this.game = engine;
        this.game.scene = "Boss";
        this.rockTimer(engine);
    }

    onPostUpdate(_engine, _delta) {
        this.movement(_engine)
    }

    onActivate(ctx) {
        this.add(this.game.player)
        this.game.player.pos = new Vector(0, 0);

        if (localStorage.getItem("slingshot") !== "true") {
            this.add(new SlingshotCollectable('slingshot', new Vector(this.game.player.pos.x + 50, this.game.player.pos.y + 150), 75, 75, 1, 1, Resources.Slingshot, CollisionType.Passive));
        }

        this.add(this.inventory);
    }

    movement(_engine) {
        //if (this.rockSpawn.isComplete()) {
           // this.initSpawns(_engine);
        //}
    }

    initSpawns(_engine) {
        let rockPosition = new Vector(this.getRandomInt(0, visualViewport.width- 100), this.getRandomInt(0, visualViewport.height- 100));

        while (this.areObjectsTooClose(rockPosition, this.boss.pos, this.minimumDistanceBetweenRockAndBoss)) {
            rockPosition = new Vector(this.getRandomInt(0, this.boss.pos.x), this.getRandomInt(0, visualViewport.height));
        }

        let rock = new RockCollectable('rock', rockPosition, 60, 60, 1, 1, Resources.Rock, CollisionType.Passive);

        let delay = this.getRandomInt(10, 20);

        this.rockSpawn = new ActionSequence(rock, ctx => {
            ctx.delay(delay * 800);
            this.add(rock);
        })

        rock.actions.runAction(this.rockSpawn);
    }

    rockTimer(engine) {
        this.timer = new Timer({
            fcn: () => this.spawn(engine),
            interval: 10000,
            repeats: true
        })
        engine.currentScene.add(this.timer)
        this.timer.start()
    }

    spawn(engine) {
        let rockPosition = new Vector(this.getRandomInt(0, visualViewport.width- 100), this.getRandomInt(0, visualViewport.height- 100));
        const rock = new RockCollectable('rock', rockPosition, 60, 60, 1, 1, Resources.Rock, CollisionType.Passive);
        this.add(rock);

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
