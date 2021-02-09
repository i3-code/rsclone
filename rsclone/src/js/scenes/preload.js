import Phaser from 'phaser';

import LoadingBar from '../utils/loadingBar';
import { soundLoader } from '../utils/soundLoader';
import { resourceLoader } from '../utils/resourceLoader';

export default class Preload extends Phaser.Scene {
  constructor() {
    super('Preload');
  }

  preload() {
    this.showBootBg();
    this.loadingBar = new LoadingBar(this);
    // Loading resources
    resourceLoader(this);
    // Loading Sounds
    soundLoader(this);
  }

  create() {
    // this.scene.start('MainMenu');
    this.scene.start('MainMenuOnlineGame');
    // this.scene.start('Level1');
  }

  showBootBg() {
    const ratio = this.game.config.width / 1920;
    this.add.sprite(0, 0, 'bootBg').setScale(ratio).setOrigin(0, 0);
  }
}
