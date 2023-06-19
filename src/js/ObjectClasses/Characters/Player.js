import {Vector} from "excalibur";
import {Character} from "./Character";
import {SlingShot} from "../Items/Shooter/SlingShot";
import {Shooter} from "../Items/Shooter/Shooter";
import {Resources} from "../../resources";

export class Player extends Character {
    game;
    direction;
    directionFacing;
    slingshot;
    velocity;
    ammunitionAmount = 0;

    constructor(name, hp, position, width, height, horizontalSpriteAmount, verticalSpriteAmount, resource, collisionType) {
        super(name, hp, position, width, height, horizontalSpriteAmount, verticalSpriteAmount, resource, collisionType)
        this.direction = {
            Up: 1,
            Down: 2,
            Left: 3,
            Right: 4,
        };
        this.velocity = 200;

    }

    onInitialize(engine) {
        this.game = engine
        this.slingShot = new SlingShot();
        this.playerSlingshot();
        this.slingShot.scale = new Vector(0.3, 0.3);
        if (localStorage.getItem("slingshot") === "true" && localStorage.getItem("inventorySlot") === "4") {
            this.slingShot.graphics.use(Resources.Slingshot.toSprite());
        }
        this.slingShot.pos = new Vector(this.pos.x + this.width/2 + 20, this.pos.y);

        document.addEventListener("joystick0up", () => this.moveUp());
        document.addEventListener("joystick0left", () => this.moveLeft());
        document.addEventListener("joystick0right", () => this.moveRight());
        document.addEventListener("joystick0down", () => this.moveDown());
        document.addEventListener("joystick0neutral", () => this.setNeutral());
        document.addEventListener("joystick0button5", () => this.shoot());
    }

    onPostUpdate(_engine, _delta) {
        super.onPostUpdate(_engine, _delta)

    }

    movement(_engine) {

    }

    moveUp() {
        this.directionFacing = this.direction.Up;
        this.vel.y = -200;
        this.graphics.use(Resources.PlayerBack.toSprite());
    }

    moveLeft() {
        this.directionFacing = this.direction.Left;
        this.vel.x = -200;
        this.graphics.use(Resources.PlayerLeft.toSprite());
    }

    moveDown() {
        this.vel.y = 200;
        this.directionFacing = this.direction.Down;
        this.graphics.use(Resources.PlayerFront.toSprite());
    }

    moveRight() {
        this.vel.x = 200;
        this.directionFacing = this.direction.Right;
        this.graphics.use(Resources.PlayerRight.toSprite());
    }

    setNeutral() {
        this.vel = new Vector(0,0);
    }

    shoot() {
        console.log("hello")
        if (localStorage.getItem('slingshot') === "true" && localStorage.getItem('inventorySlot') === "4") {
            this.game.currentScene.add(new Shooter('Shooter', this.pos, Resources.Rock.height, Resources.Rock.width, 1, 1, Resources.Rock, "Passive", this.directionFacing));
            this.ammunitionAmount--;
        }
    }

    //adds the slingshot to the player when it is picked up
    playerSlingshot() {
        if (localStorage.getItem('slingshot') === "true") {
            this.addChild(this.slingShot);
        }
    }
}