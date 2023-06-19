import {Input, Vector} from "excalibur";
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
        } else {
            this.slingShot.graphics.use();
        }
        this.slingShot.pos = new Vector(this.pos.x + this.width/2 + 20, this.pos.y);

    }

    onPostUpdate(_engine, _delta) {
        super.onPostUpdate(_engine, _delta)

    }

    movement(_engine) {
        this.horizontalMovement(_engine);
        this.verticalMovement(_engine);
        this.playerAttacks(_engine);
    }

    //handles horizontal movement
    horizontalMovement(engine) {
        //sets the vars for movement
        let xSpeed = 0;
      
    //checks which key is pressed and sets the velocity to the right amount
      if (engine.input.keyboard.isHeld(Input.Keys.Right) || engine.input.keyboard.isHeld(Input.Keys.D)) {
        xSpeed = 200;
        this.directionFacing = this.direction.Right;
        this.graphics.use(Resources.PlayerRight.toSprite());
      } else if(engine.input.keyboard.isHeld(Input.Keys.Left) || engine.input.keyboard.isHeld(Input.Keys.A)) {
        xSpeed = -200;
        this.directionFacing = this.direction.Left;
        this.graphics.use(Resources.PlayerLeft.toSprite())
      }
      //applies the speed to the object
      this.vel.x = xSpeed;
    }

    //handles vertical Movement
    verticalMovement(engine) {
        //sets the vars for movement
        let ySpeed = 0;

        //checks which key is pressed and sets the velocity to the right amount

        if(engine.input.keyboard.isHeld(Input.Keys.Up) || engine.input.keyboard.isHeld(Input.Keys.W)) {
          this.directionFacing = this.direction.Up;  
          ySpeed = -200;
            this.graphics.use(Resources.PlayerBack.toSprite());
          } else if(engine.input.keyboard.isHeld(Input.Keys.Down) || engine.input.keyboard.isHeld(Input.Keys.S)) {
            ySpeed = 200;
            this.directionFacing = this.direction.Down;
            this.graphics.use(Resources.PlayerFront.toSprite());
          }
          //applies the speed to the object
          this.vel.y = ySpeed;
    }

    // allows the player to attack whenever the space bar is pressed and the player is currently wielding a slingshot.
    playerAttacks(engine) {
        if (engine.input.keyboard.wasPressed(Input.Keys.Space) && localStorage.getItem('slingshot') === "true" && localStorage.getItem('inventorySlot') === "4") {
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