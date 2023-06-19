import {CollisionType, SpriteSheet, Input, Vector, ScreenElement} from "excalibur";
import {Resources} from "../../../resources.js";
import {InventoryItem} from "./InventoryItem.js";

const INPUT_KEY_ONE = Input.Keys.Digit1;
const INPUT_KEY_TWO = Input.Keys.Digit2;
const INPUT_KEY_THREE = Input.Keys.Digit3;
const INPUT_KEY_FOUR = Input.Keys.Digit4;
const INPUT_KEY_FIVE = Input.Keys.Digit5;

const INVENTORY_SLOT_WIDTH = 48.25;
const INVENTORY_WIDTH = 241.25;
const INVENTORY_HEIGHT = 50;
const INVENTORY_SLOTS = 5;

export class Inventory extends ScreenElement {
    inventory;
    inventorySlots = [];
    inventoryActors;

    hammerInventoryItem;
    nailInventoryItem;
    rockInventoryItem;
    slingShotInventoryItem;
    woodInventoryItem;

    constructor(position) {
        super({
            pos: position,
            height: INVENTORY_HEIGHT,
            width: INVENTORY_WIDTH,
            collisionType: CollisionType.Passive,
        })
        this.inventory = [["hammer", false], ["nail", false], ["rock", false], ["slingshot", false], ["wood", false]];

        this.hammerInventoryItem = new InventoryItem("hammer", new Vector(this.pos.x, this.pos.y), INVENTORY_SLOT_WIDTH, INVENTORY_HEIGHT, 1, 1, Resources.Hammer, CollisionType.Passive);
        this.nailInventoryItem = new InventoryItem("nail", new Vector(this.pos.x + 48, this.pos.y), INVENTORY_SLOT_WIDTH, INVENTORY_HEIGHT, 1, 1, Resources.Nail, CollisionType.Passive);
        this.rockInventoryItem = new InventoryItem("rock", new Vector(this.pos.x + 96, this.pos.y), INVENTORY_SLOT_WIDTH, INVENTORY_HEIGHT, 1, 1, Resources.Rock, CollisionType.Passive);
        this.slingShotInventoryItem = new InventoryItem("slingshot", new Vector(this.pos.x + 144, this.pos.y), INVENTORY_SLOT_WIDTH, INVENTORY_HEIGHT, 1, 1, Resources.Slingshot, CollisionType.Passive);
        this.woodInventoryItem = new InventoryItem('wood', new Vector(this.pos.x + 192, this.pos.y), INVENTORY_SLOT_WIDTH, INVENTORY_HEIGHT, 1, 1, Resources.Wood, CollisionType.Passive);

        this.initGraphics();
        this.graphics.use(this.inventorySlots[0]);
    }

    onPostUpdate(engine, delta) {
        if (engine.input.keyboard.wasPressed(INPUT_KEY_ONE)) {
            console.log(this.inventorySlots[0]);
            this.graphics.use(this.inventorySlots[0]);
            localStorage.setItem("inventorySlot", "1");
        } else if (engine.input.keyboard.wasPressed(INPUT_KEY_TWO)) {
            this.graphics.use(this.inventorySlots[1]);
            localStorage.setItem("inventorySlot", "2");
        } else if (engine.input.keyboard.wasPressed(INPUT_KEY_THREE)) {
            this.graphics.use(this.inventorySlots[2]);
            localStorage.setItem("inventorySlot", "3");
        } else if (engine.input.keyboard.wasPressed(INPUT_KEY_FOUR)) {
            this.graphics.use(this.inventorySlots[3]);
            localStorage.setItem("inventorySlot", "4");
        } else if (engine.input.keyboard.wasPressed(INPUT_KEY_FIVE)) {
            this.graphics.use(this.inventorySlots[4]);
            localStorage.setItem("inventorySlot", "5");
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
                rows: INVENTORY_SLOTS,
                columns: 1,
                spriteWidth: INVENTORY_WIDTH,
                spriteHeight: INVENTORY_HEIGHT,
            }
        });

        for (let i = 0; i < INVENTORY_SLOTS; i++) {
            this.inventorySlots[i] = spriteSheet.getSprite(0, INVENTORY_SLOTS - i - 1);
            this.inventorySlots[i].width = INVENTORY_WIDTH;
            this.inventorySlots[i].height = INVENTORY_HEIGHT;

            if (!this.inventorySlots[i]) return;
        }
        this.inventoryActors = [this.hammerInventoryItem, this.nailInventoryItem, this.rockInventoryItem, this.slingShotInventoryItem, this.woodInventoryItem];


    }
}