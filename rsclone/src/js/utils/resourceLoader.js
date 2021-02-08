import ibbSprite from '../../assets/sprites/ibb/ibb.png';
import obbSprite from '../../assets/sprites/obb/obb.png';
import githubIcon from '../../assets/images/github-logo-face.svg';
import ibbImg from '../../assets/images/ibb_stay.svg';
import obbImg from '../../assets/images/obb_stay.svg';
import ibbBg from '../../assets/images/ibb_bg.png';
import obbBg from '../../assets/images/obb_bg.png';
import ibbKeys from '../../assets/images/ibbKeys.svg';
import obbKeys from '../../assets/images/obbKeys.svg';
import bubble from '../../assets/sprites/environment/bubble.png';
import crystal from '../../assets/sprites/environment/crystal.png';
import spikes from '../../assets/sprites/environment/spikes.svg';
import hedgehogHead from '../../assets/sprites/enemies/hedgehogs/hedgehog_head.svg';
import hedgehogJumper from '../../assets/sprites/enemies/hedgehogs/hedgehog_jumper.svg';
import hedgehogHalfButt from '../../assets/sprites/enemies/hedgehogs/hedgehog_halfButt.svg';
import hedgehogFullButt from '../../assets/sprites/enemies/hedgehogs/hedgehog_fullButt.svg';
import menuMusic from '../../assets/music/main_menu.mp3';
import level1Music from '../../assets/music/level1.mp3';
import level2Music from '../../assets/music/level2.mp3';

import skyLvl1 from '../../assets/sprites/environment/level1_bg/sky.png';
import cloudsLvl1 from '../../assets/sprites/environment/level1_bg/clouds_0.png';
import bg0Lvl1 from '../../assets/sprites/environment/level1_bg/bg_0.png';
import bg1Lvl1 from '../../assets/sprites/environment/level1_bg/bg_1.png';
import bg2Lvl1 from '../../assets/sprites/environment/level1_bg/bg_2.png';

import skyLvl2 from '../../assets/sprites/environment/level2_bg/lvl2_sky.png';
import cloudsLvl2 from '../../assets/sprites/environment/level2_bg/lvl2_clouds.png';
import bg0Lvl2 from '../../assets/sprites/environment/level2_bg/lvl2_bg_0.png';
import bg1Lvl2 from '../../assets/sprites/environment/level2_bg/lvl2_bg_1.png';
import bg2Lvl2 from '../../assets/sprites/environment/level2_bg/lvl2_bg_2.png';

// world interactive environment
import platformLong from '../../assets/sprites/environment/platform-long.png';
import platformPurple from '../../assets/sprites/environment/platform-purple.png';
import platformGreen from '../../assets/sprites/environment/platform-green.png';

// world static environment
import boabab01 from '../../assets/sprites/environment/trees/boabab01.png';
import boabab02 from '../../assets/sprites/environment/trees/boabab02.png';
import boabab03 from '../../assets/sprites/environment/trees/boabab03.png';
import boabab04 from '../../assets/sprites/environment/trees/boabab04.png';
import boabab05 from '../../assets/sprites/environment/trees/boabab05.png';
import boabab06 from '../../assets/sprites/environment/trees/boabab06.png';

import palm01 from '../../assets/sprites/environment/trees/palm01.png';
import palm02 from '../../assets/sprites/environment/trees/palm02.png';
import palm03 from '../../assets/sprites/environment/trees/palm03.png';
import palm04 from '../../assets/sprites/environment/trees/palm04.png';
import palm05 from '../../assets/sprites/environment/trees/palm05.png';
import palm06 from '../../assets/sprites/environment/trees/palm06.png';

import pointer from '../../assets/sprites/environment/pointer.png';

import curved01 from '../../assets/sprites/environment/trees/curved01.png';
import curved02 from '../../assets/sprites/environment/trees/curved02.png';
import curved03 from '../../assets/sprites/environment/trees/curved03.png';

import grassSet01 from '../../assets/sprites/environment/onFloor/grass_set01.png';
import grassSet02 from '../../assets/sprites/environment/onFloor/grass_set02.png';
import rocksSet01 from '../../assets/sprites/environment/onFloor/rocks_set01.png';
import rocksSet02 from '../../assets/sprites/environment/onFloor/rocks_set02.png';
import grassUnderWorldSet01 from '../../assets/sprites/environment/onFloor/grass_underWorld_set01.png';
import grassUnderWorldSet02 from '../../assets/sprites/environment/onFloor/grass_underWorld_set02.png';
import grassUnderWorldSet03 from '../../assets/sprites/environment/onFloor/grass_underWorld_set03.png';
import grassUnderWorldSet04 from '../../assets/sprites/environment/onFloor/grass_underWorld_set04.png';
import flowersSet01 from '../../assets/sprites/environment/onFloor/flowers_set01.png';

// Resources: type, key, file, rest
const resources = [
  // Common images
  ['image', 'githubIcon', githubIcon],
  ['image', 'obbImg', obbImg],
  ['image', 'ibbImg', ibbImg],
  ['image', 'obbBg', obbBg],
  ['image', 'ibbBg', ibbBg],
  ['image', 'obbKeys', obbKeys],
  ['image', 'ibbKeys', ibbKeys],
  ['image', 'bubble', bubble],
  ['image', 'crystal', crystal],
  ['image', 'spikes', spikes],
  ['image', 'hedgehog-head', hedgehogHead],
  ['image', 'hedgehog-halfbutt', hedgehogHalfButt],
  ['image', 'hedgehog-jumper', hedgehogJumper],
  ['image', 'hedgehog-fullbutt', hedgehogFullButt],

  // Loading LEVEL 1 parallax's images
  ['image', 'lvl1_sky', skyLvl1],
  ['image', 'lvl1_clouds', cloudsLvl1],
  ['image', 'lvl1_bg0', bg0Lvl1],
  ['image', 'lvl1_bg1', bg1Lvl1],
  ['image', 'lvl1_bg2', bg2Lvl1],

  // Loading LEVEL 2 parallax's images
  ['image', 'lvl2_sky', skyLvl2],
  ['image', 'lvl2_clouds', cloudsLvl2],
  ['image', 'lvl2_bg0', bg0Lvl2],
  ['image', 'lvl2_bg1', bg1Lvl2],
  ['image', 'lvl2_bg2', bg2Lvl2],

  // Loading world interactive environment sprites
  ['image', 'platform-long', platformLong],
  ['image', 'platform-purple', platformPurple],
  ['image', 'platform-green', platformGreen],

  // Loading world static environment sprites
  ['image', 'boabab01', boabab01],
  ['image', 'boabab02', boabab02],
  ['image', 'boabab03', boabab03],
  ['image', 'boabab04', boabab04],
  ['image', 'boabab05', boabab05],
  ['image', 'boabab06', boabab06],

  ['image', 'palm01', palm01],
  ['image', 'palm02', palm02],
  ['image', 'palm03', palm03],
  ['image', 'palm04', palm04],
  ['image', 'palm05', palm05],
  ['image', 'palm06', palm06],

  ['image', 'pointer', pointer],

  ['image', 'curved01', curved01],
  ['image', 'curved02', curved02],
  ['image', 'curved03', curved03],

  ['image', 'grassSet01', grassSet01],
  ['image', 'grassSet02', grassSet02],
  ['image', 'rocksSet01', rocksSet01],
  ['image', 'rocksSet02', rocksSet02],
  ['image', 'grassUnderWorldSet01', grassUnderWorldSet01],
  ['image', 'grassUnderWorldSet02', grassUnderWorldSet02],
  ['image', 'grassUnderWorldSet03', grassUnderWorldSet03],
  ['image', 'grassUnderWorldSet04', grassUnderWorldSet04],
  ['image', 'flowersSet01', flowersSet01],

  // Loading music
  ['audio', 'menu_music', menuMusic],
  ['audio', 'level1_music', level1Music],
  ['audio', 'level2_music', level2Music],

  // Loading sprites
  ['spritesheet', 'ibb-sprite', ibbSprite, { frameWidth: 47, frameHeight: 52 }],
  ['spritesheet', 'obb-sprite', obbSprite, { frameWidth: 47, frameHeight: 62 }],
];

export function resourceLoader(scene) {
  resources.forEach((item) => {
    const type = item[0];
    const resource = item.slice(1);
    const loader = (...args) => scene.load[type](...args);
    loader(...resource);
  });
}

export default resourceLoader;
