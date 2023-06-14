import {ImageSource, Loader} from 'excalibur'
import bossImage from '../images/boss.png'
import fishImage from '../images/fish.png'

const Resources = {
    Fish: new ImageSource(fishImage),
    Boss: new ImageSource(bossImage),
}
const ResourceLoader = new Loader([
    Resources.Fish,
    Resources.Boss,
])

export {Resources, ResourceLoader}