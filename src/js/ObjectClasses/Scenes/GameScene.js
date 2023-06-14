import { Scene } from "excalibur"
import { Player } from "../Characters/Player"
import { Resources } from "../../resources"

export class GameScene extends Scene {

    constructor() {
        super()
        console.log('this is a game')
        
        this.add(new Player('player', 10, 100, 100, 1, 1, Resources.Fish, 'Active' ));
    }
}