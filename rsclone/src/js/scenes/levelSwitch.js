import Phaser from 'phaser';

import { createBg } from '../utils/createBg';

export default class LevelSwitch extends Phaser.Scene {
  constructor() {
    super('LevelSwitch');
  }

  create() {
    createBg(this, 0x000000);
    const { centerX, centerY } = this.cameras.main;
    this.titleText = this.add.text(centerX, centerY, this.nextLevelKey, {
      font: '65px Montserrat',
      fill: '#E5E5E5',
      align: 'center',
    }).setOrigin(0.5);

    this.time.addEvent({
      delay: 2500,
      callback: () => {
        this.scene.start(this.nextLevelKey);
      },
    });
  }
}