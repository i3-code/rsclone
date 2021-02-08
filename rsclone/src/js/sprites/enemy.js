import Phaser from 'phaser';
import Creature from './creature';

export default class Enemy extends Creature {
  constructor(scene, x, y, sprite) {
    super(scene, x, y, sprite, 'enemy');
    this.startX = x;
    this.startY = y;
  }

  killPlayer(pair) {
    if (pair.gameObjectB && (pair.gameObjectB.key === 'ibb' || pair.gameObjectB.key === 'obb') && pair.gameObjectB.isAlive) {
      const player = pair.gameObjectB;
      player.die();
      this.scene.time.addEvent({
        delay: 1500,
        callback: () => {
          const anotherPlayerKey = player.key === 'ibb' ? 'obb' : 'ibb';
          const anotherPlayer = this.scene.level[anotherPlayerKey];
          if (anotherPlayer.isAlive) anotherPlayer.die();
        },
      });
    }
  }

  gotKilled(pair) {
    if (pair.gameObjectB && pair.gameObjectB.type !== 'Rectangle' && pair.gameObjectB.isAlive && this.isAlive) {
      this.die();
      this.scene.events.emit('updateScore', 100);
    }
  }

  moveHorizontally(length, direction, speedMS, easeModel = 'Sine', easeType = 'InOut') {
    let destination = length;
    if (direction === 'right') {
      destination = Math.abs(destination);
    } else {
      destination *= -1;
    }
    this.scene.tweens.addCounter({
      from: 0,
      to: destination,
      duration: speedMS,
      ease: Phaser.Math.Easing[easeModel][easeType],
      repeat: -1,
      yoyo: true,
      onUpdate: (tween, target) => {
        if (!this.isAlive) {
          this.body.destroy();
          this.butt.destroy();
          return;
        }
        const x = this.startX + target.value;
        const dx = x - this.x;
        this.x = x;
        this.butt.x = this.x;
        this.butt.y = this.y + this.offsetBetweenHeadAndButt;
        this.setVelocityX(dx);
        if (this.x === this.startX) {
          this.setFlipX(false);
        }
      },
      onYoyo: () => {
        this.setFlipX(true);
      },
    });
  }

  jump(length, speedMS) {
    this.scene.tweens.addCounter({
      from: 0,
      to: !this.isUpsideDown ? length * -1 : length,
      duration: speedMS,
      ease: Phaser.Math.Easing.Sine.InOut,
      repeat: -1,
      yoyo: true,
      onUpdate: (tween, target) => {
        if (!this.isAlive) {
          this.body.destroy();
          this.butt.destroy();
          return;
        }
        const y = this.startY + target.value;
        const buttY = this.startY - target.value;
        this.y = y;
        this.butt.y = buttY + this.offsetBetweenHeadAndButt;
        if (this.y === this.startY) {
          this.setFlipY(false);
        }
      },
      onYoyo: () => {
        this.setFlipY(true);
      },
    });
  }
}
