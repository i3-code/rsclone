import Phaser from 'phaser';

import Menu from '../../components/menu';
import { createImg } from '../../utils/createImg';

import { localization } from '../../engine/localization';

export default class MainMenuOnlineGame extends Phaser.Scene {
  constructor() {
    super('MainMenuOnlineGameHost');
  }

  create() {
    createImg(this);
    const menuItems = {
      'Creating game...': '',
    };
    const menuCallBack = () => {
      this.client.sendData('dropGame');
      this.scene.start('MainMenuOnlineGame');
    };
    this.menu = new Menu(this, menuItems, true, menuCallBack);
    this.client = this.game.client;

    this.client.once('hostRoom', this.onHostRoom, this);
    this.client.once('startGame', this.onStartGame, this);
    this.client.sendData('hostRoom');
  }

  onHostRoom(name) {
    if (this.menu) {
      if (name) {
        this.menu.items[0].node.innerHTML = `${name} ready!`;
        return;
      }
      this.menu.items[0].node.innerHTML = 'No free rooms...';
    }
  }

  onStartGame(gameData) {
    this.game.level = 1;
    this.game.app.settings.level = 1;
    this.game.app.settings.score = 0;
    this.game.app.settings.time = 0;
    this.game.app.saveSettings();
    this.scene.start('Level1', gameData);
  }

  update() {
    localization(this);
  }
}
