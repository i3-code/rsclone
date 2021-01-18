export default class NetworkSync {
  constructor(scene) {
    this.scene = scene;
    this.client = scene.client;
    if (scene.client) {
      scene.client.on('playerSync', (data) => {
        const {
          playerKey,
          x,
          y,
          angle,
          disableGravitySwitch,
        } = data;
        const character = this.scene[playerKey];
        if (character) {
          if (character.x && character.x !== x) character.x = x;
          if (character.y && character.y !== y) character.y = y;
          if (character.angle && character.angle !== angle) character.angle = angle;
          if (character.disableGravitySwitch
                && character.disableGravitySwitch !== disableGravitySwitch) {
            character.disableGravitySwitch = disableGravitySwitch;
          }
        }
      });
    }
  }

  sync() {
    const character = this.scene[this.scene.playerKey];
    if (character) this.sendData(this.scene.playerKey, character);
  }

  sendData(playerKey, player) {
    this.client.sendData('playerSync', {
      playerKey,
      x: player.x,
      y: player.y,
      angle: player.angle,
      disableGravitySwitch: player.disableGravitySwitch,
    });
  }
}
