import {ImageSource, Loader} from 'excalibur'
import bossImage from '../images/boss.png'
import fishImage from '../images/fish.png'
import toolBarImage from '../images/toolbar.png'

const Resources = {
    Boss: new ImageSource(bossImage),
    Fish: new ImageSource(fishImage),
    ToolBar: new ImageSource(toolBarImage),
}
const ResourceLoader = new Loader([
    Resources.Boss,
    Resources.Fish,
    Resources.ToolBar,
])

export {Resources, ResourceLoader}