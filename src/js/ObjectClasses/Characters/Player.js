import {Input} from "excalibur";
import { Character } from "./Character";
import { SlingShot } from "../Items/Shooter/SlingShot";
import { Shooter } from "../Items/Shooter/Shooter";

export class Player extends Character {
    game;
    direction;
    slingshot;

    constructor(name, hp, position, width, height, horizontalSpriteAmount, verticalSpriteAmount, resource, collisionType) {
        super(name, hp, position, width, height, horizontalSpriteAmount, verticalSpriteAmount, resource, collisionType)
    }

    onInitialize(engine) {
        this.game = engine
        //sets which way the player is facing, 1 is right 2 is down 3 is left and 4 is up;
        this.diretion = 1;
        this.slingShot = new SlingShot();
        this.playerSlingshot();
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
        this.direction = 1;
      } else if(engine.input.keyboard.isHeld(Input.Keys.Left) || engine.input.keyboard.isHeld(Input.Keys.A)) {
        xSpeed = -200;
        this.direction = 3;
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
            ySpeed = -200;
            this.direction = 4;
          } else if(engine.input.keyboard.isHeld(Input.Keys.Down) || engine.input.keyboard.isHeld(Input.Keys.S)) {
            ySpeed = 200;
            this.direction = 2;
          }
          //applies the speed to the object
          this.vel.y = ySpeed;
    }
    
    // allows the player to attack whenever the space bar is pressed and the player is currently wielding a slingshot.
    playerAttacks(engine) {
      if(engine.input.keyboard.wasPressed(Input.Keys.Space) && localStorage.getItem('slingshot') === "true") {
        this.game.currentScene.add(new Shooter(this.pos.x, this.pos.y));
      }        
    }

    //adds the slingshot to the player when it is picked up
    playerSlingshot() {
      if(localStorage.getItem('slingshot') === "true") {
        this.addChild(this.slingShot);
    }
    }
}