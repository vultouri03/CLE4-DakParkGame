import {ImageSource, Sound, Resource, Loader} from 'excalibur'
import fishImage from '../images/fish.png'
import rockImage from '../images/stone.png'
import hammerImage from '../images/hammer.png'
import nailImage from '../images/nail.png'
import slingshotImage from '../images/slingshot.png'
import woodImage from '../images/wood.png'

const Resources = {
    Fish: new ImageSource(fishImage),
    Hammer: new ImageSource(hammerImage),
    Nail: new ImageSource(nailImage),
    Rock: new ImageSource(rockImage),
    Slingshot: new ImageSource(slingshotImage),
    Wood: new ImageSource(woodImage)
}
const ResourceLoader = new Loader([Resources.Fish, Resources.Hammer, Resources.Nail, Resources.Rock, Resources.Slingshot, Resources.Wood])

export {Resources, ResourceLoader}