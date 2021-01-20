import Phaser from 'phaser';

import { createBg } from '../../utils/createBg';

export default class GameOver extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  create() {
    createBg(this, 0x000000);
    const { centerX, centerY } = this.cameras.main;
    this.add.text(centerX, centerY, 'game over', {
      font: '65px Montserrat',
      fill: '#E5E5E5',
      align: 'center',
    }).setOrigin(0.5);

    this.time.addEvent({
      delay: 2500,
      callback: () => {
        this.scene.start('Level1');
      },
    });
  }
}
