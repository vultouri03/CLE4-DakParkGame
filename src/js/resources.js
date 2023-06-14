import {ImageSource, Loader} from 'excalibur'
import bossImage from '../images/chicken.png'
import eggPositionBossImage from '../images/egg drop attack.png'
import fishImage from '../images/fish.png'
import toolBarImage from '../images/toolbar.png'

const Resources = {
    Boss: new ImageSource(bossImage),
    EggPositionBoss: new ImageSource(eggPositionBossImage),
    Fish: new ImageSource(fishImage),
    ToolBar: new ImageSource(toolBarImage),
}
const ResourceLoader = new Loader([
    Resources.Boss,
    Resources.EggPositionBoss,
    Resources.Fish,
    Resources.ToolBar,
])

export {Resources, ResourceLoader}