import {ImageSource, Loader} from 'excalibur'
import backGroundImage from '../images/background.png'
import bossImage from '../images/chicken.png'
import eggImage from '../images/egg.png'
import eggPositionBossImage from '../images/egg drop attack.png'
import endSceneImage from '../images/endscene.png'
import fishImage from '../images/fish.png'
import hammerImage from '../images/hammer.png'
import hayImage from '../images/hay.png'
import nailImage from '../images/nail.png'
import rockImage from '../images/stone.png'
import slingshotImage from '../images/slingshot.png'
import startSceneImage from '../images/startscene.png'
// import targetImage from '../images/target.png'
import toolBarImage from '../images/toolbar.png'
import woodImage from '../images/wood.png'

const Resources = {
    BackGround: new ImageSource(backGroundImage),
    Boss: new ImageSource(bossImage),
    Egg: new ImageSource(eggImage),
    EggPositionBoss: new ImageSource(eggPositionBossImage),
    EndScene: new ImageSource(endSceneImage),
    Fish: new ImageSource(fishImage),
    Hammer: new ImageSource(hammerImage),
    Hay: new ImageSource(hayImage),
    Nail: new ImageSource(nailImage),
    Rock: new ImageSource(rockImage),
    Slingshot: new ImageSource(slingshotImage),
    StartScene: new ImageSource(startSceneImage),
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