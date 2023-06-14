
import {ImageSource, Sound, Resource, Loader} from 'excalibur'
import bossImage from '../images/boss.png'
import fishImage from '../images/fish.png'
import rockImage from '../images/stone.png'
import hammerImage from '../images/hammer.png'
import nailImage from '../images/nail.png'
import slingshotImage from '../images/slingshot.png'
import toolBarImage from '../images/toolbar.png'
import woodImage from '../images/wood.png'

const Resources = {
    Boss: new ImageSource(bossImage),
    Fish: new ImageSource(fishImage),
    Hammer: new ImageSource(hammerImage),
    Nail: new ImageSource(nailImage),
    Rock: new ImageSource(rockImage),
    Slingshot: new ImageSource(slingshotImage),
    ToolBar: new ImageSource(toolBarImage),
    Wood: new ImageSource(woodImage)
}
const ResourceLoader = new Loader([Resources.Boss, Resources.Fish, Resources.Hammer, Resources.Nail, Resources.Rock, Resources.Slingshot, Resources.ToolBar, Resources.Wood])

export {Resources, ResourceLoader}