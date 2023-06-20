import { Font, FontUnit, Input, Label, ScreenElement, Vector, Color, } from "excalibur";

export class IntroductionText extends ScreenElement {
    dialogueText;
    dialogueLine;

    constructor() {
        super();
    }

    onInitialize(engine) {
        
        this.dialogueLine = 0;
        this.dialogueText = new Label({
            text: "welcome",
            font: new Font({
                unit: FontUnit.Px,
                family: 'Impact',
                size: 28,
                color: Color.Black,
            }),
            pos: new Vector(10, 200),
            
        });
        this.addChild(this.dialogueText);
        } 

        onPreUpdate(engine) {
            console.log(this.dialogueLine)
            if(engine.input.keyboard.wasPressed(Input.Keys.Space)) {
                this.dialogueLine ++;
            }

            switch(this.dialogueLine) {
                case 0:
                    this.dialogueText.text = "oh no you have fallen asleep in het Dakpark."
                    break;
                case 1:
                    this.dialogueText.text = "to escape you must collect all items on the map"
                    break;
                case 2:
                    this.dialogueText.text = "a piece of wood to use as support"
                    break;
                case 3:
                    this.dialogueText.text = "some nalis for stabillity and a hammer to craft it into a perfect ladder"
                    break;
                case 4:
                    this.dialogueText.text = "But beware of the bunnies, they are a plague upon this land"
                    break;
                case 5:
                    this.dialogueText.text = "eating all natural resources and destroying the grass by making tunnels"
                    break;
                case 6:
                    this.dialogueText.text = "But if you find a slingshot you might be able to temporarily scare them off"
                    break;
                case 7:
                    this.dialogueText.text = "Good luck"
                    break;
            }
        }
    }
