import {Actor, GraphicsGroup, Vector} from "excalibur";
import {Resources} from "../../resources.js";

export class StartSceneBackground extends Actor {
    constructor() {
        super({ width: visualViewport.width,
            height: visualViewport.height,})

    }
    offset

    onInitialize(engine){
        const Background = Resources.StartScene.toSprite()
        this.offset = Background.width

        const group = new GraphicsGroup({
            members: [
                {
                    graphic: Background,
                    pos: new Vector(0, 0),
                },
                {
                    graphic: Background,
                    pos: new Vector(Background.width, 0),
                }
            ]
        })

        this.graphics.anchor = new Vector(0,0)
        this.graphics.add(group)
        this.pos = new Vector(0, 0)
    }

    onPostUpdate(engine, delta) {
        if (this.pos.x < -this.offset) {
            this.pos = new Vector(0, 0)
        }
    }

}