import {Actor, Vector, SpriteSheet, Animation} from "excalibur";

export class Entity extends Actor {
    name;

    constructor(name, position, width, height, horizontalSpriteAmount, verticalSpriteAmount, resource, collisionType) {
        super({
            height: resource.height / verticalSpriteAmount,
            width: resource.width / horizontalSpriteAmount,
            collisionType: collisionType,
        });

        this.name = name;
        this.scale = new Vector(width / (resource.width / horizontalSpriteAmount), height / (resource.height / verticalSpriteAmount));
        this.graphics.use(resource.toSprite());
        this.pos = position;
    }

    animationHandler = (image, rows, collumns, width, heigth, length) => {
        this.image = image;
        
        const spriteSheet = SpriteSheet.fromImageSource({
          image: this.image,
          grid: {
            rows: rows,
            columns: collumns,
            spriteWidth: width,
            spriteHeight: heigth,
          },
        });
        spriteSheet.sprites.forEach((sprite) => {
          sprite.width = width;
          sprite.height = heigth;
        });
    
        this.animation = Animation.fromSpriteSheet(
          spriteSheet,
          [0, 1, 2,3,4,5,6,7],
          length,
          
        );
      
      };
}