import { ImageSource, Sound, Resource, Loader } from 'excalibur'
import fishImage from '../images/fish.png'
import stoneImage from '../images/stone.png'

const Resources = {
    Fish: new ImageSource(fishImage),
    Stone: new ImageSource(stoneImage)
}
const resourceArray = []
for (const key in Resources) {
    resourceArray.push(Resources[key])
}

const ResourceLoader = new Loader(resourceArray)

export { Resources, ResourceLoader }