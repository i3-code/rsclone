import Phaser from 'phaser';

import Emitter from '../engine/emitter';

import { playSound } from '../utils/playSound';

export default class Creature extends Phaser.Physics.Matter.Sprite {
  constructor(scene, spriteX, spriteY, sprite, type) {
    super(scene.matter.world, spriteX, spriteY, sprite);
    this.scene = scene;
    this.isAlive = true;
    this.type = type;
  }

  die() {
    const { scene, isAlive, type } = this;
    if (!isAlive) return;
    this.isAlive = false;
    if (this.body) this.body.destroy();
    if (this.butt) this.butt.destroy();
    scene.tweens.addCounter({
      onUpdate: () => {
        if (this.scale >= 0.1) this.scale -= 0.1;
      },
    });
    switch (type) {
      case 'enemy': {
        const topEmitter = new Emitter(scene, this, 'triangle', this.reverseGravity);
        const bottomEmitter = new Emitter(scene, this, 'crystal', this.reverseGravity, 4000);
        topEmitter.emitParticles(50);
        playSound(scene, 'glass_drop');
        bottomEmitter.emitParticles(10);
        playSound(scene, 'void_chatter');
        break;
      }
      case 'player': {
        const emitter = new Emitter(scene, this, 'circle', this.isRotated);
        emitter.emitParticles(50);
        playSound(scene, 'xbb_death');
        scene.events.emit('GameOver');
        break;
      }
      default:
        break;
    }
  }
}
