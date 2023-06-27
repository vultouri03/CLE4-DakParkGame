import {ImageSource, Loader} from 'excalibur'
import arcadeImage from '../images/controller/cmgt arcade.png'
import aggressiveBunnyImage from '../images/killkillkill.png'
import appleImage from '../images/apple.png'
import backGroundImage from '../images/background.png'
import bossBackGroundImage from '../images/bossBackGround.png'
import bossImage from '../images/chicken.png'
import boulderImage from '../images/boulder.png'
import bushImage from '../images/bush.png'
import calmBunnyImage from '../images/calm bnuy.png'
import cloudsImage from'../images/clouds.png'
import eggImage from '../images/egg.png'
import eggPositionBossImage from '../images/egg drop attack.png'
import endSceneImage from '../images/endscene.png'
import fenceImage from '../images/fence.png'
import fishImage from '../images/fish.png'
import friedEggImage from '../images/fried egg.png'
import hammerImage from '../images/hammer.png'
import hayImage from '../images/hay.png'
import hearth1Image from '../images/hearths/hearth1.png'
import hearth2Image from '../images/hearths/hearth2.png'
import hearth3Image from '../images/hearths/hearth3.png'
import hearth4Image from '../images/hearths/hearth4.png'
import introduction from '../images/introduction.png'
import keyboardImage from '../images/controller/keyboard.png'
import nailImage from '../images/nail.png'
import playerBackImage from '../images/player_back.png'
import playerBackAnimation from '../images/player back animation.png'
import playerFrontImage from '../images/player_front.png'
import playerFrontAnimation from '../images/player front animation.png'
import playerLeftImage from '../images/player_left.png'
import playerLeftAnimation from '../images/player left animation.png'
import playerRightImage from '../images/player_right.png'
import playerRightAnimation from '../images/player right animation.png'
import rockImage from '../images/stone.png'
import rock1Image from '../images/rocks/rock1.png'
import rock2Image from '../images/rocks/rock2.png'
import rock3Image from '../images/rocks/rock3.png'
import rock4Image from '../images/rocks/rock4.png'
import rock5Image from '../images/rocks/rock5.png'
import rock6Image from '../images/rocks/rock6.png'
import rock7Image from '../images/rocks/rock7.png'
import rock8Image from '../images/rocks/rock8.png'
import rock9Image from '../images/rocks/rock9.png'
import runningBunny1Image from '../images/run 1.png'
import runningBunny2Image from '../images/run 2.png'
import runningBunny3Image from '../images/run 3.png'
import runningBunny4Image from '../images/run 4.png'
import runningBunny5Image from '../images/run 5.png'
import runningBunny6Image from '../images/run 6.png'
import runningBunny7Image from '../images/run 7.png'
import slingshotImage from '../images/slingshot.png'
import startSceneImage from '../images/startscene.png'
import targetImage from '../images/target.png'
import toolBarImage from '../images/toolbar.png'
import treeImage from '../images/tree.png'
import winnerSceneImage from '../images/winnerscene.png'
import woodImage from '../images/wood.png'

const Resources = {
    Arcade: new ImageSource(arcadeImage),
    AggressiveBunny: new ImageSource(aggressiveBunnyImage),
    Apple: new ImageSource(appleImage),
    BackGround: new ImageSource(backGroundImage),
    Boss: new ImageSource(bossImage),
    BossBackGround: new ImageSource(bossBackGroundImage),
    Boulder: new ImageSource(boulderImage),
    Bush: new ImageSource(bushImage),
    CalmBunny: new ImageSource(calmBunnyImage),
    Clouds: new ImageSource(cloudsImage),
    Egg: new ImageSource(eggImage),
    EggPositionBoss: new ImageSource(eggPositionBossImage),
    EndScene: new ImageSource(endSceneImage),
    Fence: new ImageSource(fenceImage),
    Fish: new ImageSource(fishImage),
    FriedEgg: new ImageSource(friedEggImage),
    Hammer: new ImageSource(hammerImage),
    Hay: new ImageSource(hayImage),
    Heart1: new ImageSource(hearth1Image),
    Heart2: new ImageSource(hearth2Image),
    Heart3: new ImageSource(hearth3Image),
    Heart4: new ImageSource(hearth4Image),
    introduction: new ImageSource(introduction),
    KeyBoard: new ImageSource(keyboardImage),
    Nail: new ImageSource(nailImage),
    PlayerBack: new ImageSource(playerBackImage),
    PlayerBackAnimation: new ImageSource(playerBackAnimation),
    PlayerFront: new ImageSource(playerFrontImage),
    PlayerFrontAnimation: new ImageSource(playerFrontAnimation),
    PlayerLeft: new ImageSource(playerLeftImage),
    PlayerLeftAnimation: new ImageSource(playerLeftAnimation),
    PlayerRight: new ImageSource(playerRightImage),
    PlayerRightAnimation: new ImageSource(playerRightAnimation),
    Rock: new ImageSource(rockImage),
    Rock1: new ImageSource(rock1Image),
    Rock2: new ImageSource(rock2Image),
    Rock3: new ImageSource(rock3Image),
    Rock4: new ImageSource(rock4Image),
    Rock5: new ImageSource(rock5Image),
    Rock6: new ImageSource(rock6Image),
    Rock7: new ImageSource(rock7Image),
    Rock8: new ImageSource(rock8Image),
    Rock9: new ImageSource(rock9Image),
    RunningBunny1: new ImageSource(runningBunny1Image),
    RunningBunny2: new ImageSource(runningBunny2Image),
    RunningBunny3: new ImageSource(runningBunny3Image),
    RunningBunny4: new ImageSource(runningBunny4Image),
    RunningBunny5: new ImageSource(runningBunny5Image),
    RunningBunny6: new ImageSource(runningBunny6Image),
    RunningBunny7: new ImageSource(runningBunny7Image),
    Slingshot: new ImageSource(slingshotImage),
    StartScene: new ImageSource(startSceneImage),
    Target: new ImageSource(targetImage),
    ToolBar: new ImageSource(toolBarImage),
    Tree: new ImageSource(treeImage),
    WinScene: new ImageSource(winnerSceneImage),
    Wood: new ImageSource(woodImage)

}

const resourceArray = []
for (const key in Resources) {
    resourceArray.push(Resources[key])
}
const ResourceLoader = new Loader(resourceArray)

export {Resources, ResourceLoader}