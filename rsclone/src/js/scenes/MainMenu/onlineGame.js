import Phaser from 'phaser';

import { createMenu } from '../../utils/createMenu';

export default class MainMenuOnlineGame extends Phaser.Scene {
  constructor() {
    super('MainMenuOnlineGame');
  }

  create() {
    this.menuItems = {
      hostGame: () => this.scene.start('MainMenuOnlineGameHost'),
      joinGame: () => this.scene.start('MainMenuOnlineGameJoin'),
    };
    this.menuCallBack = () => this.scene.switch('MainMenuPlay');
    this.createImg();
    createMenu(this, this.menuItems, true, this.menuCallBack);
  }

  createImg() {
    this.add.image(314, 215, 'ibbImg');
    this.add.image(967, 215, 'obbImg');
    this.add.image(314, 437, 'ibbKeys');
    this.add.image(967, 437, 'obbKeys');
  }
}
