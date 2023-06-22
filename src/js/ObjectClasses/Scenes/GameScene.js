import {ActionSequence, BoundingBox, CollisionType, Random, Scene, Vector} from "excalibur"
import {Resources} from "../../resources"
import {Bunny} from "../Characters/Enemy/Bunny.js";
import {WoodCollectable} from "../Items/Collectables/WoodCollectable";
import {BackGround} from "../StaticComponents/background";
import {HammerCollectable} from "../Items/Collectables/HammerCollectable.js";
import {RockCollectable} from "../Items/Collectables/RockCollectable.js";
import {NailCollectable} from "../Items/Collectables/NailCollectable.js";
import {SlingshotCollectable} from "../Items/Collectables/SlingshotCollectable.js";
import {AppleCollectable} from "../Items/Collectables/AppleCollectable.js";
import {Bush} from "../StaticComponents/Bush.js";
import {Tree} from "../StaticComponents/Tree.js";
import {Fence} from "../StaticComponents/Fence.js";

const BUNNY_WIDTH = 80;
const BUNNY_HEIGHT = 80

export class GameScene extends Scene {
    random;
    game;
    nextScene;
    bunnySpawn;
    rockSpawn;

    constructor(player, nextScene, inventory) {
        super()
        this.player = player;

        let backgroundAxisX = [-1000, 0, 1000];
        let backgroundAxisY = [-700, 0, 700];

        for (let i = 0; i < backgroundAxisX.length; i++) {
            for (let j = 0; j < backgroundAxisY.length; j++) {
                this.add(new BackGround('background', new Vector(backgroundAxisX[i], backgroundAxisY[j]), 1000, 700, 1, 1, Resources.BackGround, CollisionType.PreventCollision, new Vector(0.1, 0.1)))
            }
        }

        this.add(new Bush('bush', new Vector(800,900), 200,200,1,1,Resources.Bush,CollisionType.Passive));
        this.add(new Bush('bush', new Vector(700,1000), 200,200,1,1,Resources.Bush,CollisionType.Passive));
        this.add(new Bush('bush', new Vector(550,750), 200,200,1,1,Resources.Bush,CollisionType.Passive));
        this.add(new Bush('bush', new Vector(500,980), 200,200,1,1,Resources.Bush,CollisionType.Passive));
        this.add(new Bush('bush', new Vector(-130,900), 200,200,1,1,Resources.Bush,CollisionType.Passive));
        this.add(new Bush('bush', new Vector(0,980), 200,200,1,1,Resources.Bush,CollisionType.Passive));
        this.add(new SlingshotCollectable('slingshot', new Vector(140, 800), 75, 75, 1, 1, Resources.Slingshot, CollisionType.Passive));
        this.add(new Bush('bush', new Vector(50,800), 200,200,1,1,Resources.Bush,CollisionType.Passive));
        this.add(new Bush('bush', new Vector(1250,850), 200,200,1,1,Resources.Bush,CollisionType.Passive));
        this.add(new Bush('bush', new Vector(1000,800), 200,200,1,1,Resources.Bush,CollisionType.Passive));
        this.add(new Bush('bush', new Vector(-200,500), 200,200,1,1,Resources.Bush,CollisionType.Passive));
        let xPosFence = -1450;
        for (let i = 0; i < 32; i++) {
            this.add(new Fence('fence', new Vector(xPosFence,-1010), 100,100,1,1,Resources.Fence));
            xPosFence += 94;
        }
        xPosFence = -1450;
        for (let i = 0; i < 32; i++) {
            this.add(new Fence('fence', new Vector(xPosFence,1010), 100,100,1,1,Resources.Fence));
            xPosFence += 94;
        }



        let hammer = new HammerCollectable('hammer', new Vector(-750, -500), 75, 75, 1, 1, Resources.Hammer, CollisionType.Passive);
        this.add(hammer);
        this.add(new WoodCollectable('wood', new Vector(300, 500), 50, 50, 1, 1, Resources.Wood, CollisionType.Passive));
        this.addRandomAmountOfBunniesNearHammer(hammer);

        this.random = new Random();
        for (let i = 0; i < 10; i++) {
            this.add(new RockCollectable('rock', new Vector(this.random.integer(-1300, 1300), this.random.integer(-950, 950)), 60, 60, 1, 1, Resources.Rock, CollisionType.Passive));
        }

        for (let i = 0; i < 5; i++) {
            this.add(new NailCollectable('nail', new Vector(this.random.integer(-1500, -500), this.random.integer(350, 1050)), 25, 25, 1, 1, Resources.Nail, CollisionType.Passive));
        }

        for (let i = 0; i < 3; i++) {
            this.add(new AppleCollectable('rock', new Vector(this.random.integer(-1300, 1300), this.random.integer(-950, 950)), 60, 60, 1, 1, Resources.Apple, CollisionType.Passive));
        }

        this.add(inventory);
        this.nextScene = nextScene;
    }

    onInitialize(engine) {
        this.game = engine;
       // engine.add(this.game.player);

        

        this.initSpawns(engine);
    }

    onPreUpdate(engine, delta) {
        

        if (localStorage.getItem("hammer") === "true" &&
            localStorage.getItem("nail") === "true" &&
            localStorage.getItem("wood") === "true"
            && localStorage.getItem("bossIsKilled") !== "true") {
            this.player.pos = new Vector(100, 300);
            engine.goToScene(this.nextScene);
        }
    }

    onActivate(ctx) {
        this.camera.clearAllStrategies
        this.game.scene = "game";
        this.add(this.game.player)
        this.camera.strategy.elasticToActor(this.game.player, 0.1, 0.3);
        let boundingBox = new BoundingBox(
            -1500,
            -1050,
            1500,
            1050
        )
        this.camera.strategy.limitCameraBounds(boundingBox);
    }

    onDeactivate(ctx) {
        this.camera.clearAllStrategies()
    }

    onPostUpdate(_engine, _delta) {
        this.movement(_engine);
    }

    movement(_engine) {
        if (this.bunnySpawn.isComplete()) {
            let bunnyPosition = new Vector(this.getRandomInt(-1000, 1000), this.getRandomInt(-700, 700));
            let bunny = new Bunny("bunny", 10, bunnyPosition, BUNNY_WIDTH, BUNNY_HEIGHT, 1, 1, Resources.CalmBunny, CollisionType.Passive);

            this.bunnySpawn = this.initItemSpawn(_engine, bunny);
            bunny.actions.runAction(this.bunnySpawn);
        }

        if (this.rockSpawn.isComplete()) {
            let rockPosition = new Vector(this.getRandomInt(-1000, 1000), this.getRandomInt(-700, 700));
            let rock = new RockCollectable('rock', rockPosition, 60, 60, 1, 1, Resources.Rock, CollisionType.Passive);

            this.rockSpawn = this.initItemSpawn(_engine, rock);
            rock.actions.runAction(this.rockSpawn);
        }
    }

    initSpawns(_engine) {
        let bunnyPosition = new Vector(this.getRandomInt(-1000, 1000), this.getRandomInt(-700, 700));
        let bunny = new Bunny("bunny", 10, bunnyPosition, BUNNY_WIDTH, BUNNY_HEIGHT, 1, 1, Resources.CalmBunny, CollisionType.Passive);

        let rockPosition = new Vector(this.getRandomInt(-1000, 1000), this.getRandomInt(-700, 700));
        let rock = new RockCollectable('rock', rockPosition, 60, 60, 1, 1, Resources.Rock, CollisionType.Passive);

        this.bunnySpawn = this.initItemSpawn(_engine, bunny);
        this.rockSpawn = this.initItemSpawn(_engine, rock);

        bunny.actions.runAction(this.bunnySpawn);
        rock.actions.runAction(this.rockSpawn);
    }

    initItemSpawn(_engine, item) {
        let delay = this.getRandomInt(20, 30);

        return new ActionSequence(item, ctx => {
            ctx.delay(delay * 1000);
            this.add(item);

            console.log(item.name, item.pos);
        })
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }


    areObjectsTooClose(bunny, other, size) {
        return Math.abs(bunny.x - other.x) < size && Math.abs(bunny.y - other.y) < size;
    }

    distanceBetweenObjects(width, height, otherWidth, otherHeight) {
        return Math.max(width, height) / 2 + Math.max(otherWidth, otherHeight) / 2;
    }

    randomPosBasedOnOtherObject(distanceBetweenObjects, positionOfOtherObjects) {
        let randomX = this.getRandomInt(positionOfOtherObjects.x - distanceBetweenObjects, positionOfOtherObjects.x + distanceBetweenObjects);
        let randomY = this.getRandomInt(positionOfOtherObjects.y - distanceBetweenObjects, positionOfOtherObjects.y + distanceBetweenObjects);
        return new Vector(randomX, randomY);
    }

    addRandomAmountOfBunniesNearHammer(hammer) {
        let bunnies = [];
        let bunnyPosition;

        let distanceBetweenBunnies = this.distanceBetweenObjects(BUNNY_WIDTH, BUNNY_HEIGHT, BUNNY_WIDTH, BUNNY_HEIGHT);
        let distanceBetweenBunnyAndHammer = this.distanceBetweenObjects(BUNNY_WIDTH, BUNNY_HEIGHT, hammer.width, hammer.height);

        this.random = this.getRandomInt(3, 5)
        for (let i = 0; i < this.random; i++) {
            bunnyPosition = this.randomPosBasedOnOtherObject(200, hammer.pos);

            for (let j = 0; j < bunnies.length; j++) {
                if (this.areObjectsTooClose(bunnyPosition, bunnies[j].pos, distanceBetweenBunnies) || this.areObjectsTooClose(bunnyPosition, hammer.pos, distanceBetweenBunnyAndHammer)) {
                    bunnyPosition = this.randomPosBasedOnOtherObject(200, hammer.pos);
                    j = -1;
                }
            }

            bunnies[i] = new Bunny("bunny", 10, bunnyPosition, BUNNY_WIDTH, BUNNY_HEIGHT, 1, 1, Resources.CalmBunny, CollisionType.Passive);
            this.add(bunnies[i]);
        }
    }
}