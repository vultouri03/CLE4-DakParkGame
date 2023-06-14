import { Actor, Input, Vector } from "excalibur";
import { Character } from "./Character";
import { Resources } from "../../resources";

export class Player extends Character {
    game;

    constructor(name, hp, width, height, spriteWidth, spriteHeight, resource, collisionType) {
        super(name, hp, width, height, spriteWidth, spriteHeight, resource, collisionType)
            this.graphics.use(resource.toSprite());
    }

    onInitialize(engine) {
        this.game = engine
    }

    onPostUpdate(_engine, _delta) {
        super._onPostUpdate(_engine, _delta)
    }
    
    movement(engine) {
        console.log('hello')
        this.horizontalMovement(engine);
         this.verticalMovement(engine);
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