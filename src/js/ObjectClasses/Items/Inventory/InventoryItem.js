import {UIElement} from "../UIElement.js";

export class InventoryItem extends UIElement {

    constructor(name, position, width, height, horizontalSpriteAmount, verticalSpriteAmount, resource, collisionType) {
        super(name, position, width, height, horizontalSpriteAmount, verticalSpriteAmount, resource, collisionType);

    }

    onPostUpdate(_engine, _delta) {
        if (localStorage.getItem(this.name) === "false") {
            this.kill();
        }
    }
}