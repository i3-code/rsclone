import Phaser from 'phaser';

import Menu from '../../components/menu';
import Range from '../../components/range';

import { localization } from '../../utils/localization';

import { LOCALE } from '../../locale';

export default class MainMenuPlay extends Phaser.Scene {
  constructor() {
    super('MainMenuSettings');
  }

  create() {
    const appLocale = this.game.app.settings.locale;
    const locale = LOCALE[appLocale];

    const menuItems = {
      fullscreen: () => {},
      music: () => {},
      sound: () => {},
      language: () => {},
    };
    const menuCallBack = () => this.back();
    this.menu = new Menu(this, menuItems, true, menuCallBack);

    const off = locale.off || 'off';
    const on = locale.on || 'on';
    const rangeItems = {
      fullscreen: [undefined, 1, this.getSettings('fullscreen'), off, on],
      music: [200, 100, this.getSettings('music'), '', this.getSettings('music')],
      sound: [200, 100, this.getSettings('sound'), '', this.getSettings('sound')],
      locale: [undefined, 1, this.getSettings('locale'), 'en', 'ru'],
    };
    this.range = new Range(this, rangeItems);
  }

  update() {
    localization(this);
  }

  back() {
    this.scene.switch((this.game.isStarted) ? 'GameMenu' : 'MainMenu');
  }

  focusOut(name) {
    const { left, right } = this.range.items[name];
    if (!left.node.innerHTML) {
      right.node.classList.remove('active');
    }
  }

  changeSettings(name) {
    const { settings } = this.game.app;
    const item = this.range.items[name];
    const { left, right } = item;
    const value = +item.range.node.value;
    switch (name) {
      case ('fullscreen'):
        settings.fullscreen = !!(value);
        if (settings.fullscreen && !document.fullscreenElement) {
          this.game.app.gameContainer.requestFullscreen();
        }
        if (!settings.fullscreen && document.fullscreenElement && document.exitFullscreen) {
          document.exitFullscreen();
        }
        if (value) {
          right.node.classList.add('active');
          left.node.classList.remove('active');
        }
        if (!value) {
          right.node.classList.remove('active');
          left.node.classList.add('active');
        }
        break;
      case ('music'):
        settings.music.volume = value / 100;
        if (this.game.music.current) this.game.music.current.setVolume(value / 100);
        right.node.innerHTML = value;
        if (!left.node.innerHTML) right.node.classList.add('active');
        break;
      case ('sound'):
        settings.sound.volume = value / 100;
        right.node.innerHTML = value;
        if (!left.node.innerHTML) right.node.classList.add('active');
        break;
      case ('locale'):
        settings.locale = (value) ? 'ru' : 'en';
        if (value) {
          right.node.classList.add('active');
          left.node.classList.remove('active');
        }
        if (!value) {
          right.node.classList.remove('active');
          left.node.classList.add('active');
        }
        break;
      default:
    }
  }

  getSettings(name) {
    const { settings } = this.game.app;
    switch (name) {
      case ('fullscreen'):
        return +settings.fullscreen;
      case ('music'):
        return +settings.music.volume * 100;
      case ('sound'):
        return +settings.sound.volume * 100;
      case ('locale'):
        return +(settings.locale !== 'en');
      default:
        return 0;
    }
  }
}
