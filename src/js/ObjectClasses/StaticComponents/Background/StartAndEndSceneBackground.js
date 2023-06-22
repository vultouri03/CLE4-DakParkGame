import {Actor, GraphicsGroup, Vector} from "excalibur";

export class StartAndEndSceneBackground extends Actor {
    offset;
    backgroundSprite;

    constructor(backGroundSprite) {

        super({
            width: visualViewport.width,
            height: visualViewport.height,
            pos: new Vector(0, 0),
        })
        this.backgroundSprite = backGroundSprite;
    }

    onInitialize(engine){
        const backgroundGraphic = new GraphicsGroup({
            members: [
                {
                    graphic: this.backgroundSprite.toSprite(),
                    pos: new Vector(0, 0),
                },
                {
                    graphic: this.backgroundSprite.toSprite(),
                    pos: new Vector(this.backgroundSprite.width, 0),
                }
            ]
        })

        this.graphics.anchor = new Vector(0,0);
        this.graphics.add(backgroundGraphic);
    }

    onPostUpdate(engine, delta) {
        let offset = this.backgroundSprite.width;
        if (this.pos.x < -offset) {
            this.pos = new Vector(0, 0);
        }
    }
}