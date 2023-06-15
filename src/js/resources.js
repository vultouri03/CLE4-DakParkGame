import {ImageSource, Loader} from 'excalibur'
import bossImage from '../images/chicken.png'
import eggPositionBossImage from '../images/egg drop attack.png'
import fishImage from '../images/fish.png'
import hammerImage from '../images/hammer.png'
import nailImage from '../images/nail.png'
import rockImage from '../images/stone.png'
import slingshotImage from '../images/slingshot.png'
// import targetImage from '../images/target.png'
import toolBarImage from '../images/toolbar.png'
import woodImage from '../images/wood.png'

const Resources = {
    Boss: new ImageSource(bossImage),
    EggPositionBoss: new ImageSource(eggPositionBossImage),
    Fish: new ImageSource(fishImage),
    Hammer: new ImageSource(hammerImage),
    Nail: new ImageSource(nailImage),
    Rock: new ImageSource(rockImage),
    Slingshot: new ImageSource(slingshotImage),
    // Target: new ImageSource(targetImage),
    ToolBar: new ImageSource(toolBarImage),
    Wood: new ImageSource(woodImage)
}

const resourceArray = []
for (const key in Resources) {
    resourceArray.push(Resources[key])
}
const ResourceLoader = new Loader(resourceArray)

export {Resources, ResourceLoader}