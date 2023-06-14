import {Input} from "excalibur";
import { Character } from "./Character";

export class Player extends Character {
    game;

    constructor(name, hp, position, width, height, horizontalSpriteAmount, verticalSpriteAmount, resource, collisionType) {
        super(name, hp, position, width, height, horizontalSpriteAmount, verticalSpriteAmount, resource, collisionType)
    }

    onInitialize(engine) {
        this.game = engine
    }

    onPostUpdate(_engine, _delta) {
        super.onPostUpdate(_engine, _delta)
    }
    
    movement(_engine) {
        console.log('hello')
        this.horizontalMovement(_engine);
         this.verticalMovement(_engine);
    }

    //handles horzontal movement
    horizontalMovement(engine) {
        //sets the vars for movement
        let xSpeed = 0;
        
    //checks which key is pressed and sets the velocity to the right amount
      if (engine.input.keyboard.isHeld(Input.Keys.Right) || engine.input.keyboard.isHeld(Input.Keys.D)) {
        xSpeed = 200;
      } else if(engine.input.keyboard.isHeld(Input.Keys.Left) || engine.input.keyboard.isHeld(Input.Keys.A)) {
        xSpeed = -200;
      }
      //aplies the speed to the object
      this.vel.x = xSpeed;
    }

    //handles vertical Movement
    verticalMovement(engine) {
        //sets the vars for movement
        let ySpeed = 0;

        //checks which key is pressed and sets the velocity to the right amount
        if(engine.input.keyboard.isHeld(Input.Keys.Up) || engine.input.keyboard.isHeld(Input.Keys.W)) {
            ySpeed = -200;
          } else if(engine.input.keyboard.isHeld(Input.Keys.Down) || engine.input.keyboard.isHeld(Input.Keys.S)) {
            ySpeed = 200;
          }
          //applies the speed to the object
          this.vel.y = ySpeed;
    }
    
    playerAttacks(engine) {
        if(engine.input.keyboard.wasPressed(Input.Keys.Space)) {
            
        }
    }
}