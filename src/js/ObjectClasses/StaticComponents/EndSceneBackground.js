import {Actor, GraphicsGroup, Vector} from "excalibur";
import {Resources} from "../../resources.js";

export class EndSceneBackground extends Actor {
    constructor() {
        super({ width: visualViewport.width,
            height: visualViewport.height,})

    }
    offset

    onInitialize(engine){
        const background = Resources.EndScene.toSprite()
        this.offset = background.width

        const group = new GraphicsGroup({
            members: [
                {
                    graphic: background,
                    pos: new Vector(0, 0),
                },
                {
                    graphic: background,
                    pos: new Vector(background.width, 0),
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