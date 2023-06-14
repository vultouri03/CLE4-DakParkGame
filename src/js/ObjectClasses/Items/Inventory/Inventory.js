import {Actor, CollisionType, SpriteSheet, Input} from "excalibur";
import {Resources} from "../../../resources.js";

const INPUT_KEY_ONE = Input.Keys.Digit1;
const INPUT_KEY_TWO = Input.Keys.Digit2;
const INPUT_KEY_THREE = Input.Keys.Digit3;
const INPUT_KEY_FOUR = Input.Keys.Digit4;

let inventorySlot1Highlighted, inventorySlot2Highlighted, inventorySlot3Highlighted, inventorySlot4Highlighted;
export class Inventory extends Actor {
    inventory;
    inventoryActors;

    constructor(position) {
        super({
            pos: position,
            height: 50,
            width: 193,
            collisionType: CollisionType.Passive,
        })
        this.inventory = [];
        this.initGraphics();
        this.graphics.use(inventorySlot1Highlighted);
    }

    onPostUpdate(engine, delta) {
        if (engine.input.keyboard.wasPressed(INPUT_KEY_ONE)) {
            this.graphics.use(inventorySlot1Highlighted);
            localStorage.setItem("inventorySlot", "1");
        } else if (engine.input.keyboard.wasPressed(INPUT_KEY_TWO)) {
            this.graphics.use(inventorySlot2Highlighted);
            localStorage.setItem("inventorySlot", "2");
        } else if (engine.input.keyboard.wasPressed(INPUT_KEY_THREE)) {
            this.graphics.use(inventorySlot3Highlighted);
            localStorage.setItem("inventorySlot", "3");
        } else if (engine.input.keyboard.wasPressed(INPUT_KEY_FOUR)) {
            this.graphics.use(inventorySlot4Highlighted);
            localStorage.setItem("inventorySlot", "4");
        }

        for (let i = 0; i < this.inventory.length; i++) {
            if (localStorage.getItem(this.inventory[i][0]) === "true" && !this.inventory[i][1]) {
                this.inventory[i][1] = true;
                engine.add(this.inventoryActors[i]);
            }
        }
    }

    initGraphics = () => {
        const spriteSheet = SpriteSheet.fromImageSource({
            image: Resources.ToolBar,
            grid: {
                rows: 4,
                columns: 1,
                spriteWidth: 193,
                spriteHeight: 50.5,
            }
        });
        inventorySlot4Highlighted = spriteSheet.getSprite(0, 0);
        if (!inventorySlot4Highlighted) return;
        inventorySlot4Highlighted.width = 193;
        inventorySlot4Highlighted.height = 50.5;

        inventorySlot3Highlighted = spriteSheet.getSprite(0, 1);
        if (!inventorySlot3Highlighted) return;
        inventorySlot3Highlighted.width = 193;
        inventorySlot3Highlighted.height = 50.5;

        inventorySlot2Highlighted = spriteSheet.getSprite(0, 2);
        if (!inventorySlot2Highlighted) return;
        inventorySlot2Highlighted.width = 193;
        inventorySlot2Highlighted.height = 50.5;

        inventorySlot1Highlighted = spriteSheet.getSprite(0, 3);
        if (!inventorySlot1Highlighted) return;
        inventorySlot1Highlighted.width = 193;
        inventorySlot1Highlighted.height = 50.5;

        this.inventoryActors = [];

    }
}