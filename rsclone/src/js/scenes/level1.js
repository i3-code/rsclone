import Phaser from 'phaser';

import Player from '../sprites/player';
import Portal from '../sprites/portal';

import StandartHedgehog from '../sprites/enemies/standartHedgehog';
import JumpingHedgehog from '../sprites/enemies/jumpingHedgehog';
import { gradientSquares, gradientColors, walls } from '../levels/level1/backgroundStructure';

import { BORDER_THICKNESS } from '../constants';
import { playMusic } from '../utils/music';
import EventsCenter from '../utils/eventsCenter';

const player1Controls = ['LEFT', 'RIGHT', 'UP', 'DOWN'];
const player2Controls = ['A', 'D', 'W', 'S'];

const levelWidth = 5369;
const levelHeight = 890;

const parallaxImages = {
  sky: 0,
  clouds_1: 0.3,
  clouds_2: 0.6,
  clouds_3: 0.9,
  clouds_4: 0.12,
  rocks_1: 0.3,
  rocks_2: 0.6,
};
export default class Level1 extends Phaser.Scene {
  constructor() {
    super('Level1');
    this.walls = [];
    this.portals = [];
    this.score = 0;
  }

  create() {
    this.matter.world.setBounds(0, 0, levelWidth, levelHeight, BORDER_THICKNESS);
    this.cameras.main.setBounds(0, 0, levelWidth, levelHeight);
    this.cameras.main.roundPixels = true;
    // this.addBackgrounds();
    this.addParallax();
    this.addWalls();
    this.ibb = new Player(this, 'ibb', 3900, 350, 'ibb-sprite', player1Controls); // 200 200
    this.obb = new Player(this, 'obb', 3900, 400, 'obb-sprite', player2Controls); // 300 300
    this.hedgehog = new StandartHedgehog(this, 3400, 558, 'hedgehog-head', 'hedgehog-halfbutt', 58);
    this.hedgehog.moveHorizontally(300, 'left', 2500);
    this.hedgehog2 = new JumpingHedgehog(this, 2800, 595, 'hedgehog-jumper', 'hedgehog-fullbutt', 80);
    this.hedgehog2.jump(180, 800);
    this.cursors = this.input.keyboard.createCursorKeys();
    playMusic(this, 'level1_music');
    this.scene.run('Score');
    this.scoreChange();
    this.gameMenu();
  }

  addParallax() {
    this.parallax = {};
    Object.entries(parallaxImages).forEach(([key, speed]) => {
      const sprite = this.add.tileSprite(
        0,
        0,
        this.game.config.width,
        this.game.config.height,
        key,
      )
        .setOrigin(0, 0)
        .setScrollFactor(0);

      this.parallax[key] = { key, sprite, speed };
    });
  }

  scrollParallax() {
    this.myCam = this.cameras.main;
    Object.values(this.parallax).forEach((item) => {
      const { sprite, speed } = item;
      if (speed) sprite.tilePositionX = this.cameras.main.scrollX * speed;
    });
  }

  addBackgrounds() {
    // main background
    this.background = this.add.graphics();
    this.background.fillGradientStyle(0x3C6771, 0xB3B061, 0x3C6771, 0xB3B061, 1);
    this.background.fillRect(0, 0, levelWidth, levelHeight);
    // underworld backgrounds
    gradientSquares.forEach((item, index) => {
      const {
        width,
        height,
      } = item;
      const top = levelHeight - height;
      let left = 0;
      let i = index;
      while (i > 0) {
        i -= 1;
        left += gradientSquares[i].width;
      }
      const startColor = gradientColors[index];
      const endColor = gradientColors[index + 1];
      const bg = this.add.graphics();
      bg.fillGradientStyle(startColor, endColor, startColor, endColor, 1);
      bg.fillRect(left, top, width, height);
    });
  }

  addWalls() {
    const wallDefaultColor = 0x082228;
    const portalColor = 0xffffff;
    const wallDefaultHeight = 16;

    walls.forEach((item) => {
      const {
        width,
        y,
        x,
        isPortal,
        isVertical,
      } = item;
      const top = y - wallDefaultHeight;
      const wallHeight = isVertical ? width : wallDefaultHeight;
      const wallWidth = isVertical ? wallDefaultHeight : width;
      const wallColor = isPortal ? portalColor : wallDefaultColor;
      const wallX = x + wallWidth / 2;
      const wallY = top + wallHeight / 2;
      // these and other options should be configured for proper physic behaviour
      const objSettings = {
        isSensor: isPortal,
        isStatic: true,
      };
      if (isPortal) {
        // moved portal to separate class for better detection in collision event with instanceof
        const portal = new Portal(
          this, wallX, wallY, wallWidth, wallHeight, wallColor, objSettings,
        );
        this.portals.push(portal);
      } else {
        const wall = this.add.rectangle(wallX, wallY, wallWidth, wallHeight, wallColor);
        this.matter.add.gameObject(wall, objSettings);
      }
    });
  }

  centerCamera() {
    if (this.ibb.isAlive && this.obb.isAlive) {
      const cam = this.cameras.main;
      const ibbCoords = {
        x: this.ibb.sensors.bottom.position.x,
        y: this.ibb.sensors.bottom.position.y,
      };
      const obbCoords = {
        x: this.obb.sensors.bottom.position.x,
        y: this.obb.sensors.bottom.position.y,
      };
      const charactersXDiff = Math.abs(obbCoords.x - ibbCoords.x);
      const charactersYDiff = Math.abs(obbCoords.y - ibbCoords.y);
      const camZoom = 1 - 0.05 * (charactersXDiff / cam.width);
      const closestToLeftCharacterX = ibbCoords.x > obbCoords.x ? obbCoords.x : ibbCoords.x;
      const closestToTopCharacterY = ibbCoords.y > obbCoords.y ? obbCoords.y : ibbCoords.y;
      const cameraX = parseInt(charactersXDiff / 2 + closestToLeftCharacterX, 10);
      const cameraY = parseInt(charactersYDiff / 2 + closestToTopCharacterY, 10);
      if (camZoom !== cam.zoom) cam.setZoom(camZoom);
      if (cameraX !== cam.midPoint.x) cam.centerOnX(cameraX);
      if (cameraY !== cam.midPoint.Y) cam.centerOnY(cameraY);
      this.charactersDistance = charactersXDiff;
    }
  }

  update() {
    if (this.ibb && this.obb) {
      this.centerCamera();
      this.scrollParallax();
    }
  }

  scoreChange() {
    // временно скор меняется по нажатию шифта - потом любое другое событие или действие
    this.cursors.shift.on('down', () => {
      this.score += 1;
      // важна вот эта фраза для передачи апдейта скора
      eventsCenter.emit('update-score', this.score);
    });

    // this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
    //   this.cursors.shift.on('down');
    // });
  }

  gameMenu() {
    this.cursors.space.on('down', () => {
      this.scene.pause('Score');
      this.scene.switch('GameMenu');
    });
  }
}
