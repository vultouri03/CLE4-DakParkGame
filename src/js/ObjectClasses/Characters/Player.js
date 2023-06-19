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
        this.animationHandler(Resources.PlayerBackAnimation, 1, 4, this.width, this.height, 100);
        this.backAnimation = this.animation;
        this.animationHandler(Resources.PlayerFrontAnimation, 1, 4, this.width, this.height, 100);
        this.frontAnimation = this.animation;
        this.animationHandler(Resources.PlayerLeftAnimation, 1, 4, this.width, this.height, 100);
        this.leftAnimation = this.animation;
        this.animationHandler(Resources.PlayerRightAnimation, 1, 4, this.width, this.height, 100);
        this.rightAnimation = this.animation;
        this.animating = false;
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
        this.animatingCheck();

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
        this.animating = false;
    //checks which key is pressed and sets the velocity to the right amount
      if (engine.input.keyboard.isHeld(Input.Keys.Right) || engine.input.keyboard.isHeld(Input.Keys.D)) {
        xSpeed = 200;
        this.animating = true;
        this.directionFacing = this.direction.Right;
        this.graphics.use(this.rightAnimation);
      } else if(engine.input.keyboard.isHeld(Input.Keys.Left) || engine.input.keyboard.isHeld(Input.Keys.A)) {
        xSpeed = -200;
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

        if(engine.input.keyboard.isHeld(Input.Keys.Up) || engine.input.keyboard.isHeld(Input.Keys.W)) {
          this.directionFacing = this.direction.Up;  
          ySpeed = -200;
          this.animating = true;
            this.graphics.use(this.backAnimation);
            
          } else if(engine.input.keyboard.isHeld(Input.Keys.Down) || engine.input.keyboard.isHeld(Input.Keys.S)) {
            ySpeed = 200;
            this.animating = true;
            this.directionFacing = this.direction.Down;
            this.graphics.use(this.frontAnimation);
            
          }
          //applies the speed to the object
          this.vel.y = ySpeed;
    }

    // allows the player to attack whenever the space bar is pressed and the player is currently wielding a slingshot.
    playerAttacks(engine) {
        if (engine.input.keyboard.wasPressed(Input.Keys.Space) && localStorage.getItem('slingshot') === "true" && localStorage.getItem('inventorySlot') === "4") {
            this.game.currentScene.add(new Shooter('Shooter', this.pos, Resources.Rock.height, Resources.Rock.width, 1, 1, Resources.Rock, "Passive", this.directionFacing));
        }
    }

    //adds the slingshot to the player when it is picked up
    playerSlingshot() {
        if (localStorage.getItem('slingshot') === "true") {
            this.addChild(this.slingShot);
        }
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