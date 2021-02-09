import Phaser from 'phaser';

import Menu from '../../components/menu';
import { createImg } from '../../utils/createImg';

import { localization } from '../../engine/localization';

export default class MainMenuOnlineGame extends Phaser.Scene {
  constructor() {
    super('MainMenuOnlineGameJoin');
  }

  create() {
    createImg(this);
    const menuItems = {
      'Looking for a game...': '',
    };
    const menuCallBack = () => {
      this.client.sendData('dropGame');
      this.scene.start('MainMenuOnlineGame');
    };
    this.menu = new Menu(this, menuItems, true, menuCallBack);
    this.client = this.game.client;

    this.client.once('getRooms', this.onGetRooms, this);
    this.client.once('startGame', this.onStartGame, this);
    this.client.sendData('getRooms');
  }

  onGetRooms(rooms) {
    if (this.menu) {
      if (rooms && rooms.length) {
        this.menu.spawn.destroy();
        const menuItems = {};
        rooms.forEach((room) => {
          menuItems[room] = () => this.client.sendData('joinRoom', room);
        });
        this.menu = new Menu(this, menuItems, true, this.menuCallBack);
        return;
      }
      if (!rooms || !rooms.length) this.menu.items[0].node.innerHTML = 'No rooms found...';
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
