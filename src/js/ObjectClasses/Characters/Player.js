import {Input, Vector, CollisionType, ExitViewPortEvent, clamp} from "excalibur";
import {Bunny} from "./Enemy/Bunny.js";
import {Character} from "./Character";
import {SlingShot} from "../Items/Shooter/SlingShot";
import {Shooter} from "../Items/Shooter/Shooter";
import {Resources} from "../../resources";

export class Player extends Character {
    game;

    slingshot;
    ammunitionAmount = 0;

    velocity;
    direction;
    directionFacing;
    backAnimation;
    frontAnimation;
    leftAnimation;
    rightAnimation;
    animating;


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
        this.addChild(this.slingShot);
        this.initGraphics();
        this.screenExit();

        console.log("GAMEPAD: ",engine.input.gamepads.at(0));
        if (engine.input.gamepads.at(0).connected) {
            console.log("CON");
            document.addEventListener("joystick0up", () => this.moveUp());
            document.addEventListener("joystick0left", () => this.moveLeft());
            document.addEventListener("joystick0right", () => this.moveRight());
            document.addEventListener("joystick0down", () => this.moveDown());
            document.addEventListener("joystick0neutral", () => this.setNeutral());
        }
    }

    initGraphics() {
        this.animationHandler(Resources.PlayerBackAnimation, 1, 4, this.width, this.height, 100);
        this.backAnimation = this.animation;
        this.animationHandler(Resources.PlayerFrontAnimation, 1, 4, this.width, this.height, 100);
        this.frontAnimation = this.animation;
        this.animationHandler(Resources.PlayerLeftAnimation, 1, 4, this.width, this.height, 100);
        this.leftAnimation = this.animation;
        this.animationHandler(Resources.PlayerRightAnimation, 1, 4, this.width, this.height, 100);
        this.rightAnimation = this.animation;
        this.animating = false;

        if(this.hp <= 0) {
            this.kill();
        }

    }

    onPostUpdate(_engine, _delta) {
        if (!_engine.input.gamepads.at(0).connected) {
            super.onPostUpdate(_engine, _delta)
        }
        this.animatingCheck();
        this.death();

        this.playerAttacks(_engine);
        this.slingShot.graphics.visible = localStorage.getItem("slingshot") === "true" && localStorage.getItem("inventorySlot") === "4";
        this.pos.x = clamp(this.pos.x, -1450, 1450);
        this.pos.y = clamp(this.pos.y, -1000, 1000);
    }



    movement(_engine) {
        this.horizontalMovement(_engine);
        this.verticalMovement(_engine);
    }

    //handles horizontal movement
    horizontalMovement(engine) {
        //sets the vars for movement
        let xSpeed = 0;
        this.animating = false;
        //checks which key is pressed and sets the velocity to the right amount
        if (engine.input.keyboard.isHeld(Input.Keys.Right) || engine.input.keyboard.isHeld(Input.Keys.D)) {
            xSpeed = this.velocity;
            this.animating = true;
            this.directionFacing = this.direction.Right;
            this.graphics.use(this.rightAnimation);
        } else if (engine.input.keyboard.isHeld(Input.Keys.Left) || engine.input.keyboard.isHeld(Input.Keys.A)) {
            xSpeed = -1 * this.velocity;
            this.animating = true;
            this.directionFacing = this.direction.Left;
            this.graphics.use(this.leftAnimation)

        }
        //applies the speed to the object
        this.vel.x = xSpeed;
    }

    //handles vertical Movement
    verticalMovement(engine) {
        //sets the vars for movement
        let ySpeed = 0;

        //checks which key is pressed and sets the velocity to the right amount

        if (engine.input.keyboard.isHeld(Input.Keys.Up) || engine.input.keyboard.isHeld(Input.Keys.W)) {
            this.directionFacing = this.direction.Up;
            ySpeed = -200;
            this.animating = true;
            this.graphics.use(this.backAnimation);

        } else if (engine.input.keyboard.isHeld(Input.Keys.Down) || engine.input.keyboard.isHeld(Input.Keys.S)) {
            ySpeed = 200;
            this.animating = true;
            this.directionFacing = this.direction.Down;
            this.graphics.use(this.frontAnimation);

        }
        //applies the speed to the object
        this.vel.y = ySpeed;
    }


    onPreKill(_scene) {
        this.game.player = new Player('player', 10, new Vector(150, 150), 100, 130, 1, 1, Resources.PlayerFront, CollisionType.Active);
        this.game.goToScene("endScene");
    }

    moveUp() {
        this.vel.y = -this.velocity;
        console.log(this.vel);
        this.directionFacing = this.direction.Up;
        this.animating = true;
        this.graphics.use(this.backAnimation);
    }

    moveLeft() {
        this.vel.x = -1 * this.velocity;
        this.directionFacing = this.direction.Left;
        this.animating = true;
        this.graphics.use(this.leftAnimation);
    }

    moveDown() {
        this.vel.y = this.velocity;
        this.directionFacing = this.direction.Down;
        this.animating = true;
        this.graphics.use(this.frontAnimation);
    }

    moveRight() {
        this.vel.x = this.velocity;
        this.directionFacing = this.direction.Right;
        this.animating = true;
        this.graphics.use(this.rightAnimation);
    }

    setNeutral() {
        this.vel = new Vector(0, 0);
        this.animating = false;
    }

    // allows the player to attack whenever the space bar is pressed and the player is currently wielding a slingshot.
    playerAttacks(engine) {
        let isPressingShooterKey = engine.input.keyboard.wasPressed(Input.Keys.Space);
        let isPressingShooterButton = engine.input.gamepads.at(0).isButtonPressed(Input.Buttons.Face4);
        if ((isPressingShooterKey || isPressingShooterButton) && localStorage.getItem('slingshot') === "true" && localStorage.getItem('inventorySlot') === "4" && this.ammunitionAmount > 0) {
            this.game.currentScene.add(new Shooter('Shooter', this.pos, Resources.Rock.height, Resources.Rock.width, 1, 1, Resources.Rock, "Passive", this.directionFacing));
            this.ammunitionAmount--;
        }
    }

    //adds the slingshot to the player when it is picked up
    playerSlingshot() {
        if (localStorage.getItem('slingshot') === "true") {
            this.addChild(this.slingShot);
        }
        this.slingShot.pos = new Vector(0, -80);
        this.slingShot.scale = new Vector(0.3, 0.3);
    }

    screenExit() {
        this.on("exitviewport", (event) => {
            this.vel = new Vector(0, 0);
        })
    }

    animatingCheck() {
        if (this.animating === false) {
            switch (this.directionFacing) {
                case this.game.player.direction.Right:
                    this.graphics.use(Resources.PlayerRight.toSprite())
                    break;
                case this.game.player.direction.Down:
                    this.graphics.use(Resources.PlayerFront.toSprite())
                    break;
                case this.game.player.direction.Left:
                    this.graphics.use(Resources.PlayerLeft.toSprite())
                    break;
                case this.game.player.direction.Up:
                    this.graphics.use(Resources.PlayerBack.toSprite())
                    break;
            }
        }
    }
}