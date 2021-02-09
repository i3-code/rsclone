import { THROTTLE_DELAY } from '../constants';

export default class Network {
  constructor(scene) {
    this.scene = scene;
    this.client = scene.client;
    this.initSync = this.initSync.bind(this);

    if (this.client) {
      this.client.off('newRecord');
      this.client.on('newRecord', (data) => {
        this.scene.game.spawnPopup(this.scene, 'newRecord', data);
      });
      this.client.off('noRecord');
      this.client.on('noRecord', (data) => {
        this.scene.game.spawnPopup(this.scene, 'noRecord', data);
      });
    }
  }

  initSync() {
    const { playerKey } = this.scene;
    const player = this.scene.level[playerKey];
    this.player = player;
    this.client.off('playerMove');
    this.client.on('playerMove', this.onPlayerMove, this);

    this.client.off('playerSync');
    this.client.on('playerSync', this.onPlayerSync, this);

    player.data.events.on('changedata', this.onChangeData, this);

    this.scene.events.off('update', this.onUpdate, this);
    this.scene.events.on('update', this.onUpdate, this);
  }

  onChangeData(player, key, value) {
    const name = player.key;
    this.client.sendData('playerSync', { name, key, value });
  }

  onPlayerMove(data) {
    const { playerKey, direction, movementFlag } = data;
    this.scene.level.setDirection(playerKey, direction, movementFlag);
  }

  onPlayerSync(data) {
    const { name, key, value } = data;
    const player = this.scene.level[name];
    const oldValue = player[key];
    if (oldValue && oldValue !== value) player[key] = value;
  }

  onUpdate() {
    const { player } = this;
    if (player && player.body) player.updateData();
  }
}
