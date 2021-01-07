import Phaser from 'phaser';
import ibbSprite from '../../assets/sprites/ibb/ibb-sprite.png';
import obbSprite from '../../assets/sprites/obb/obb-sprite.png';
import githubIcon from '../../assets/images/github-logo-face.svg';
import ibbImg from '../../assets/images/ibb.png';
import obbImg from '../../assets/images/obb.png';
import ibbKeys from '../../assets/images/ibbKeys.svg';
import obbKeys from '../../assets/images/obbKeys.svg';
import mainMenuMusic from '../../assets/music/main_menu.mp3';
import level1Music from '../../assets/music/level1.mp3';
import level2Music from '../../assets/music/level2.mp3';

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super('Preload');
  }

  preload() {
    this.load.image('githubIcon', githubIcon);
    this.load.image('obbImg', obbImg);
    this.load.image('ibbImg', ibbImg);
    this.load.image('obbKeys', obbKeys);
    this.load.image('ibbKeys', ibbKeys);
    this.createBg();
    this.load.spritesheet('ibb-sprite', ibbSprite, {
      frameWidth: 47,
      frameHeight: 53,
    });
    this.load.spritesheet('obb-sprite', obbSprite, {
      frameWidth: 47,
      frameHeight: 64,
    });
    this.load.audio('main_menu_music', mainMenuMusic);
    this.load.audio('level1_music', level1Music);
    this.load.audio('level2_music', level2Music);
  }

  create() {
    this.scene.start('menuMain');
    // this.scene.start('Level1');
  }

  createBg() {
    const ratio = this.game.config.width / 1920;
    this.add.sprite(0, 0, 'bg').setScale(ratio).setOrigin(0);
  }
}
