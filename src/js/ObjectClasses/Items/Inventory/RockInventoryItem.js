import {UIElement} from "../UIElement.js";
import {Resources} from "../../../resources.js";

export class RockInventoryItem extends UIElement {

    constructor(name, position, width, height, horizontalSpriteAmount, verticalSpriteAmount, resource, collisionType) {
        super(name, position, width, height, horizontalSpriteAmount, verticalSpriteAmount, resource, collisionType);
    }

    onPostUpdate(_engine, _delta) {
        switch (_engine.player.ammunitionAmount) {
            case 0: {
                this.kill();
                localStorage.setItem(this.name, "false");
                break;
            } case 1: {
                this.graphics.use(Resources.Rock1.toSprite());
                break;
            } case 2: {
                this.graphics.use(Resources.Rock2.toSprite());
                break;
            } case 3: {
                this.graphics.use(Resources.Rock3.toSprite());
                break;
            } case 4: {
                this.graphics.use(Resources.Rock4.toSprite());
                break;
            } case 5: {
                this.graphics.use(Resources.Rock5.toSprite());
                break;
            } case 6: {
                this.graphics.use(Resources.Rock6.toSprite());
                break;
            } case 7: {
                this.graphics.use(Resources.Rock7.toSprite());
                break;
            } case 8: {
                this.graphics.use(Resources.Rock8.toSprite());
                break;
            } case 9: {
                this.graphics.use(Resources.Rock9.toSprite());
                break;
            }
        }
    }
}