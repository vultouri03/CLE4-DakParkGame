import {Input, Vector, CollisionType, clamp} from "excalibur";
import {Resources} from "../../resources";

import {Character} from "./Character";
import {SlingShot} from "../Items/Shooter/SlingShot";
import {Shooter} from "../Items/Shooter/Shooter";


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
    isMoving;
    slingshotDistanceFromPlayerX;
    slingshotDistanceFromPlayerY;


    constructor(name, hp, position, width, height, horizontalSpriteAmount, verticalSpriteAmount, resource, collisionType) {
        super(name, hp, position, width, height, horizontalSpriteAmount, verticalSpriteAmount, resource, collisionType)
        this.direction = {
            Up: 1,
            Down: 2,
            Left: 3,
            Right: 4,

        };

        this.velocity = 200;
        this.slingshotDistanceFromPlayerX = 40;
        this.slingshotDistanceFromPlayerY = 60;
    }

    onInitialize(engine) {
        this.game = engine;
        this.playerSlingshot();
        this.initGraphics();
        this.screenExit();

        let controllerIsCollected = engine.input.gamepads.at(0).connected;
        if (controllerIsCollected) {
            document.addEventListener("joystick0up", () => this.moveUp());
            document.addEventListener("joystick0left", () => this.moveLeft());
            document.addEventListener("joystick0right", () => this.moveRight());
            document.addEventListener("joystick0down", () => this.moveDown());
            document.addEventListener("joystick0neutral", () => this.setNeutral());
            this.setSlingShotPos()
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
        this.isMoving = false;

        if(this.hp <= 0) {
            this.kill();
        }
    }

    onPostUpdate(_engine, _delta) {
        let controllerIsNotConnected = !_engine.input.gamepads.at(0).connected;
        if (controllerIsNotConnected) {
            this.keyBoardMovement(_engine);
        }

        this.animatingCheck();
        this.playerAttacks(_engine);
        this.slingShot.graphics.visible = localStorage.getItem("slingshot") === "true" && localStorage.getItem("inventorySlot") === "4";
        this.death();
        if(this.game.scene === "gameScene") {
        this.pos.x = clamp(this.pos.x, -1450, 1450);
        this.pos.y = clamp(this.pos.y, -1000, 1000);
        } else {
            this.pos.x = clamp(this.pos.x, 0, visualViewport.width);
            this.pos.y = clamp(this.pos.y, 0, visualViewport.height);
        }
    }

    keyBoardMovement(_engine) {
        this.horizontalMovement(_engine);
        this.verticalMovement(_engine);
        this.setSlingShotPos();
    }

    //handles horizontal movement
    horizontalMovement(engine) {
        //sets the vars for movement
        let xSpeed = 0;
        this.isMoving = false;

        //checks which key is pressed and sets the velocity to the right amount
        let walkingRightKeyIsHeld = engine.input.keyboard.isHeld(Input.Keys.Right)|| engine.input.keyboard.isHeld(Input.Keys.D);
        let walkingLeftKeyIsHeld = engine.input.keyboard.isHeld(Input.Keys.Left) || engine.input.keyboard.isHeld(Input.Keys.A);
        if (walkingRightKeyIsHeld) {
            xSpeed = this.velocity;
            this.isMoving = true;
            this.directionFacing = this.direction.Right;
            this.graphics.use(this.rightAnimation);

        } else if (walkingLeftKeyIsHeld) {
            xSpeed = -this.velocity;
            this.isMoving = true;
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
        let walkingUpKeyIsHeld = engine.input.keyboard.isHeld(Input.Keys.Up) || engine.input.keyboard.isHeld(Input.Keys.W);
        let walkingDownKeyIsHeld = engine.input.keyboard.isHeld(Input.Keys.Down) || engine.input.keyboard.isHeld(Input.Keys.S);
        if (walkingUpKeyIsHeld) {
            this.directionFacing = this.direction.Up;
            ySpeed = -this.velocity;
            this.isMoving = true;
            this.graphics.use(this.backAnimation);

        } else if (walkingDownKeyIsHeld) {
            ySpeed = this.velocity;
            this.isMoving = true;
            this.directionFacing = this.direction.Down;
            this.graphics.use(this.frontAnimation);

        }

        //applies the speed to the object
        this.vel.y = ySpeed;
    }

    setSlingShotPos() {
        let slingShotPosX;
        let playerIsWalkingLeft = this.vel.x < 0;
        let playerIsWalkingRight = this.vel.x > 0;

        if (playerIsWalkingLeft) {
            slingShotPosX = -this.slingshotDistanceFromPlayerX;
        } else if (playerIsWalkingRight) {
            slingShotPosX = this.slingshotDistanceFromPlayerX;
        } else {
            slingShotPosX = 0;
        }


        let slingShotPosY;
        let playerIsWalkingUp = this.vel.y < 0;
        let playerIsWalkingDown = this.vel.y > 0;

        if (playerIsWalkingUp) {
            slingShotPosY = -this.slingshotDistanceFromPlayerY;
        } else if (playerIsWalkingDown) {
            slingShotPosY = this.slingshotDistanceFromPlayerY;
        } else {
            slingShotPosY = 0;
        }

        let playerIsStandingStill = this.vel.x === 0 && this.vel.y === 0;
        if (playerIsStandingStill) {
            switch (this.directionFacing) {
                case this.direction.Up: {
                    slingShotPosY = -this.slingshotDistanceFromPlayerY;
                    break;
                } case this.direction.Down: {
                    slingShotPosY = this.slingshotDistanceFromPlayerY;
                    break;
                } case this.direction.Left: {
                    slingShotPosX = -this.slingshotDistanceFromPlayerX;
                    break;
                } case this.direction.Right: {
                    slingShotPosX = this.slingshotDistanceFromPlayerX;
                    break;
                }
            }
        }

        this.slingShot.pos = new Vector(slingShotPosX, slingShotPosY);
    }


    onPreKill(_scene) {
        this.game.player = new Player('player', 10, new Vector(150, 150), 100, 130, 1, 1, Resources.PlayerFront, CollisionType.Active);
        this.game.goToScene("endScene");
    }

    moveUp() {
        this.vel.y = -this.velocity;
        this.directionFacing = this.direction.Up;
        this.isMoving = true;
        this.graphics.use(this.backAnimation);
    }

    moveLeft() {
        this.vel.x = -this.velocity;
        this.directionFacing = this.direction.Left;
        this.isMoving = true;
        this.graphics.use(this.leftAnimation);
    }

    moveDown() {
        this.vel.y = this.velocity;
        this.directionFacing = this.direction.Down;
        this.isMoving = true;
        this.graphics.use(this.frontAnimation);
    }

    moveRight() {
        this.vel.x = this.velocity;
        this.directionFacing = this.direction.Right;
        this.isMoving = true;
        this.graphics.use(this.rightAnimation);
    }

    setNeutral() {
        this.vel = new Vector(0, 0);
        this.isMoving = false;
    }

    // allows the player to attack whenever the space bar is pressed and the player is currently wielding a slingshot.
    playerAttacks(engine) {
        let isPressingShooterKey = engine.input.keyboard.wasPressed(Input.Keys.Space);
        let isPressingShooterButton = engine.input.gamepads.at(0).isButtonPressed(Input.Buttons.Face4);
        let playerHasSlingshot = localStorage.getItem('slingshot') === "true";
        let currentInventorySlotSelectedIsSlingShotSlot = localStorage.getItem('inventorySlot') === "4";

        if ((isPressingShooterKey || isPressingShooterButton) && playerHasSlingshot && currentInventorySlotSelectedIsSlingShotSlot && this.ammunitionAmount > 0) {
            this.game.currentScene.add(new Shooter('Shooter', this.pos, Resources.Rock.height, Resources.Rock.width, 1, 1, Resources.Rock, "Passive", this.directionFacing));
            this.ammunitionAmount--;
        }
    }

    //adds the slingshot to the player when it is picked up
    playerSlingshot() {
        this.slingShot = new SlingShot(new Vector(0, -80), new Vector(0.3, 0.3));
        this.addChild(this.slingShot);
    }

    screenExit() {
        this.on("exitviewport", () => {
            this.vel = new Vector(0, 0);
        })
    }

    animatingCheck() {
        if (this.isMoving === false) {
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