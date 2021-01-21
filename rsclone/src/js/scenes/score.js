import Phaser from 'phaser';
import EventsCenter from '../utils/eventsCenter';
import Create from '../components/dom-create';

import { LOCALE } from '../locale';

import { localization } from '../utils/localization';

export default class Score extends Phaser.Scene {
  constructor() {
    super('Score');
  }

  create() {
    this.currentTime = 0;
    this.currentScore = 0;

    const locale = LOCALE[this.game.app.settings.locale];
    const timeText = locale.time || 'time';
    const scoreText = locale.score || 'score';

    this.board = new Create('div');
    this.container = new Create('div', this.board.node, 'game-score');
    this.timeLabel = new Create('div', this.container.node, 'game-score-time-label', timeText);
    this.timeValue = new Create('div', this.container.node, 'game-score-time', this.getTime());
    this.scoreLabel = new Create('div', this.container.node, 'game-score-score-label', scoreText);
    this.scoreValue = new Create('div', this.container.node, 'game-score-score', '0');
    this.board.spawn = this.add.dom(10, 10, this.board.node);
    this.board.spawn.setScrollFactor(0, 0);
    this.board.spawn.setOrigin(0);

    EventsCenter.on('update-score', this.updateScore, this);

    this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.currentTime += 1;
      },
      callbackScope: this,
      loop: true,
    });
  }

  update() {
    this.updateTime();
    localization(this);
  }

  getTime() {
    const date = new Date(null);
    date.setSeconds(this.currentTime);
    return date.toISOString().substr(11, 8);
  }

  updateTime() {
    this.timeValue.node.innerHTML = this.getTime();
  }

  updateScore(score) {
    this.currentScore += score;
    this.scoreValue.node.innerHTML = this.currentScore;
  }

  /*
  create() {
    const locale = LOCALE[this.game.app.settings.locale];
    this.currentScore = 0;
    this.currentTime = 0;
    this.timeText = locale.time || 'time';
    this.scoreText = locale.score || 'score';
    this.addScore();
    this.addTimer();
    EventsCenter.on('update-score', this.updateScore, this);
  }

  update() {
    localization(this);
  }

  addTimer() {
    const zeroAdd = (number) => {
      let res = String(number);
      while (res.length < 2) {
        res = `0${res}`;
      }
      return res;
    };

    const setTimerStyle = (timeInSeconds) => {
      const hours = Math.floor(timeInSeconds / 3600);
      const minutes = Math.floor(timeInSeconds / 60) % 60;
      const seconds = Math.floor(timeInSeconds) % 60;
      return `${zeroAdd(hours)} : ${zeroAdd(minutes)} : ${zeroAdd(seconds)}`;
    };

    this.timerText = this.add.text(10, 10, 'time: 00 : 00 : 00', {
      font: '20px Montserrat',
      fill: '#003554',
    }).setScrollFactor(0, 0).setOrigin(0);

    this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.currentTime += 1;
        this.timerText.setText(`${this.timeText}:  ${setTimerStyle(this.currentTime)}`);
      },
      callbackScope: this,
      loop: true,
    });
  }

  addScore() {
    this.scoreText = this.add.text(10, 35, '', {
      font: '20px Montserrat',
      fill: '#003554',
    }).setScrollFactor(0, 0).setOrigin(0);

    this.scoreText.setText(`score:  ${this.currentScore}`);
  }

  updateScore(score) {
    this.currentScore += score;
    this.scoreText.setText(`${this.scoreText}:  ${this.currentScore}`);
  }
  */
}
