const socketIO = require('socket.io');

function generatePostfix() {
  const randomNum = Math.floor(Math.random() * 9998 + 1);
  return randomNum.toString().padStart(4, '0');
}
module.exports = class Socket {
  constructor(server, db) {
    this.db = db;
    this.rooms = {};
    this.io = socketIO(server, { cors: { origin: '*' } });
    this.io.on('connection', (socket) => {
      socket.on('playerMove', (data) => this.onPlayerMove(socket, data));
      socket.on('playerSync', (data) => this.onPlayerSync(socket, data));
      socket.on('hostRoom', () => this.onHostRoom(socket));
      socket.on('getRooms', () => this.onGetRooms(socket));
      socket.on('dropGame', () => this.onDisconnect(socket));
      socket.on('joinRoom', (name) => this.onJoinRoom(socket, name));
      socket.on('requestStartGame', (sessionName) => this.onRequestStartGame(socket, sessionName));
      socket.on('disconnect', () => this.onDisconnect(socket));
      socket.on('checkScore', (data) => this.onCheckScore(socket, data));
      socket.on('getScore', () => this.onGetScores(socket));
      socket.on('updateName', (data) => this.onUpdateName(data));
    });
  }

  onUpdateName(data) {
    const { id, name } = data;
    const callBack = (result, error) => {
      if (error) console.log('Error:', error);
    };
    this.db.query('update', callBack, id, { $set: { name } });
  }

  onGetScores(socket) {
    const callBack = (result, error) => {
      if (error) {
        console.log('Error:', error);
        return;
      }
      socket.emit('getScore', result);
    };
    this.db.query('getAll', callBack);
  }

  checkScore(socket, item) {
    const callBack = (result, error) => {
      if (error) {
        console.log('Error:', error);
        return;
      }
      const filterField = '_id';
      const itemId = item[filterField].toString();
      const score = +item.score.toString();
      const time = +item.time.toString();
      let position = -1;
      result.filter((resItem, index) => {
        const resItemId = resItem[filterField].toString();
        const found = (itemId === resItemId);
        if (found) position = index + 1;
        return found;
      });

      const sendData = {
        position,
        id: itemId,
        score,
        time,
      };

      const action = (position <= 100 && position >= 0) ? 'newRecord' : 'noRecord';
      socket.emit(action, sendData);
    };

    this.db.query('getAll', callBack);
  }

  onCheckScore(socket, data) {
    const callBack = (result, error) => {
      if (error) {
        console.log('Error:', error);
        return;
      }
      const item = result.ops[0];
      if (item) this.checkScore(socket, item);
    };
    const newItem = data;
    const postfix = generatePostfix();
    if (!newItem.name) newItem.name = `noName_${postfix}`;
    this.db.query('create', callBack, newItem);
  }

  onPlayerMove(socket, data) {
    Object.values(this.rooms).forEach((room) => {
      if (room && room.playerOneSocket && room.playerTwoSocket) {
        if (room.playerOneSocket.id === socket.id || room.playerTwoSocket.id === socket.id) {
          room.playerOneSocket.emit('playerMove', data);
          room.playerTwoSocket.emit('playerMove', data);
        }
      }
    });
  }

  onPlayerSync(socket, data) {
    Object.values(this.rooms).forEach((room) => {
      if (room && room.playerOneSocket && room.playerTwoSocket) {
        if (room.playerOneSocket.id === socket.id || room.playerTwoSocket.id === socket.id) {
          room.playerOneSocket.emit('playerSync', data);
          room.playerTwoSocket.emit('playerSync', data);
        }
      }
    });
  }

  onHostRoom(socket) {
    if (!this.rooms[socket.id]) this.rooms[socket.id] = {};
    const room = this.rooms[socket.id];

    const postfix = generatePostfix();
    if (!room.name) room.name = `game#${postfix}`;

    if (!room.playerOneSocket || room.playerOneSocket.id !== socket.id) {
      room.playerOneSocket = socket;
    }

    if (room.playerTwoSocket) {
      room.playerTwoSocket.emit('dropGame');
      room.playerTwoSocket = undefined;
    }

    room.playerOneSocket.emit('hostRoom', room.name);
  }

  onGetRooms(socket) {
    const rooms = [];
    Object.values(this.rooms).forEach((room) => {
      if (room && room.name && !room.playerTwoSocket) rooms.push(room.name);
    });
    socket.emit('getRooms', rooms);
  }

  onDisconnect(socket) {
    if (this.rooms[socket.id]) this.rooms[socket.id] = undefined;
  }

  onJoinRoom(socket, name) {
    Object.values(this.rooms).forEach((room) => {
      if (room && room.name && room.name === name) {
        const currentRoom = room;
        currentRoom.playerTwoSocket = socket;
        if (currentRoom.playerOneSocket && currentRoom.playerTwoSocket) {
          currentRoom.playerOneSocket.emit('startGame', { online: true, master: true });
          currentRoom.playerTwoSocket.emit('startGame', { online: true, master: false });
        }
      }
    });
  }
};
