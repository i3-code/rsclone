import Phaser from 'phaser';
import PhaserMatterCollisionPlugin from 'phaser-matter-collision-plugin';
import Create from './components/dom-create';

import Client from './utils/client';

import { SCENE_LIST } from './scenes/_scenesList';

import { GAME_WIDTH, GAME_HEIGHT } from './constants';

const WebFont = require('webfontloader');

class Main {
  constructor() {
    const cookieVersion = 0;
    const settings = JSON.parse(localStorage.getItem('rsc-game-settings')) || {
      locale: 'en',
      sound: {
        enabled: true,
        volume: 0.01,
      },
      music: {
        enabled: true,
        volume: 0.005,
      },
      cookieVersion,
    };
    const savedVersion = settings.cookieVersion;
    if (savedVersion !== cookieVersion) localStorage.clear();
    this.init();
  }

  init() {
    this.gameContainer = new Create('div', document.body, 'game-container').node;
    this.gameConfig = {
      type: Phaser.AUTO,
      parent: this.gameContainer,
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: GAME_WIDTH,
        height: GAME_HEIGHT,
      },
      physics: {
        default: 'matter',
        matter: {
          enableSleeping: false,
          gravity: { y: 2 },
          debug: {
            showBody: false,
            showStaticBody: false,
          },
        },
      },
      plugins: {
        scene: [
          {
            plugin: PhaserMatterCollisionPlugin, // The plugin class
            key: 'matterCollision', // Where to store in Scene.Systems, e.g. scene.sys.matterCollision
            mapping: 'matterCollision', // Where to store in the Scene, e.g. scene.matterCollision
          },
        ],
      },
      fps: {
        target: 60,
        forceSetTimeOut: true,
      },
      scene: SCENE_LIST,
    };
    this.game = new Phaser.Game(this.gameConfig);
    this.game.client = new Client();
    this.game.music = {
      current: undefined,
      cache: {},
    };
    this.game.sounds = {
      volume: {},
      cache: {},
      walk: { ibb: {}, obb: {} },
    };
  }
}

WebFont.load({
  google: { families: ['Montserrat'] },
});

const main = new Main();
window.main = main;
