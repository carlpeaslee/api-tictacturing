'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressGraphql = require('express-graphql');

var _expressGraphql2 = _interopRequireDefault(_expressGraphql);

var _schema = require('./data/schema');

var _schema2 = _interopRequireDefault(_schema);

var _expressJwt = require('express-jwt');

var _expressJwt2 = _interopRequireDefault(_expressJwt);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _db = require('./data/db');

var _db2 = _interopRequireDefault(_db);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _submitMove = require('./data/mutations/submitMove');

var _TTTGuess = require('./data/models/TTTGuess');

var _TTTGuess2 = _interopRequireDefault(_TTTGuess);

var _winChecker = require('./tictactoe/winChecker');

var _winChecker2 = _interopRequireDefault(_winChecker);

var _ai = require('./tictactoe/ai');

var _ai2 = _interopRequireDefault(_ai);

var _PermissionsHandler = require('./data/mutations/PermissionsHandler');

var _PermissionsHandler2 = _interopRequireDefault(_PermissionsHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.set('port', process.env.PORT || 3001);

app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// PRODUCTION
var secret = process.env.AUTH_SECRET;

//DEVELOPMENT
// import authSecret from '../authSecret'
// const secret = authSecret


var jwtCheck = (0, _expressJwt2.default)({
  secret: new Buffer(secret, 'base64'),
  audience: 'ygUSzo55mYxKoOuUAQAsxAwKqkuG0YvM',
  credentialsRequired: false
});

function permissionsMiddleware(req, res, next) {
  if (!req.user) {
    req.permissions = [1];
    next();
  } else {
    var requesterId = req.user.sub;
    (0, _PermissionsHandler2.default)(requesterId).then(function (person) {
      req.permissions = person.permissions;
      next();
    });
  }
}

var corsOptions = {
  origin: true,
  credentials: true
};

app.use('/graphql', [(0, _cors2.default)(corsOptions), jwtCheck, permissionsMiddleware], (0, _expressGraphql2.default)(function (req) {
  return {
    schema: _schema2.default,
    graphiql: true,
    context: {
      permissions: req.permissions
    },
    pretty: true
  };
}));

_db2.default.sync().then(function (err) {
  console.log('It worked!');
}, function (err) {
  console.log('An error occurred while creating the table:', err);
});

var server = app.listen(app.get('port'), function () {
  console.log('Find the server at: http://localhost:' + app.get('port') + '/'); // eslint-disable-line no-console
});

var io = new _socket2.default(server);
io.set('origins', '*:*');

var waitingRooms = [];
var liveMatches = [];

var INITIAL_BOARDSTATE = {
  0: 'EMPTY',
  1: 'EMPTY',
  2: 'EMPTY',
  3: 'EMPTY',
  4: 'EMPTY',
  5: 'EMPTY',
  6: 'EMPTY',
  7: 'EMPTY',
  8: 'EMPTY'
};

io.on('connection', function (socket) {
  var playerId = socket.id;

  socket.on('matchReqest', function (data) {
    if (waitingRooms.length === 0) {
      (function () {
        var waitingRoom = {
          roomId: _uuid2.default.v4(),
          player1: playerId
        };
        waitingRooms.push(waitingRoom);
        socket.join(waitingRoom.roomId);
        io.to(waitingRoom.roomId).emit('waitingRoomFound', waitingRoom);
        setTimeout(function () {
          waitingRooms.find(function (room, index, array) {
            if (room.roomId === waitingRoom.roomId) {
              var match = _extends({}, waitingRooms.shift(), {
                player2: 'ROBOT',
                boardState: _extends({}, INITIAL_BOARDSTATE)
              });
              liveMatches.push(match);
              io.to(match.roomId).emit('opponentFound', match);
            }
          });
        }, 6000);
      })();
    } else {
      var match = _extends({}, waitingRooms.shift(), {
        player2: playerId,
        boardState: _extends({}, INITIAL_BOARDSTATE)
      });
      liveMatches.push(match);
      socket.join(match.roomId);
      io.to(match.roomId).emit('opponentFound', match);
    }
  });

  socket.on('moveMade', function (data) {
    console.log(data);
    var playerId = data.playerId;
    var position = data.position;
    var matchId = data.matchId;

    liveMatches.find(function (match, index, array) {
      if (match.roomId === matchId) {
        array[index].boardState[position] = playerId;
        io.to(matchId).emit('moveRecorded', {
          playerId: playerId,
          position: position
        });
        (0, _submitMove.addMove)(undefined, matchId, playerId, position);
        var winResult = (0, _winChecker2.default)(array[index].boardState);
        if (winResult) {
          io.to(matchId).emit('winner', _extends({}, winResult));
          array.splice(index, 1);
        }
        if (match.player2 === 'ROBOT' && !winResult) {
          console.log('ROBOT DETECTED');
          var wait = Math.floor(Math.random() * 6000);
          setTimeout(function () {
            var move = (0, _ai2.default)(array[index].boardState);
            array[index].boardState[move] = 'ROBOT';
            io.to(matchId).emit('moveRecorded', {
              playerId: 'ROBOT',
              position: move
            });
            (0, _submitMove.addMove)(undefined, matchId, 'ROBOT', move);
            var winResult = (0, _winChecker2.default)(array[index].boardState);
            if (winResult) {
              io.to(matchId).emit('winner', _extends({}, winResult));
              array.splice(index, 1);
            }
          }, wait);
        }
      }
    });
  });

  socket.on('turingGuess', function (data) {
    console.log('turing guess made', data);
    _TTTGuess2.default.build({
      guessId: undefined,
      matchId: data.matchId,
      playerId: data.playerId,
      guessedRobot: data.guessedRobot
    }).save().then(function (anotherTask) {
      return "wow success!";
    }).catch(function (error) {
      console.log(error);
    });
  });

  socket.on('disconnect', function () {
    liveMatches.find(function (match, index, array) {
      if (match.player1 === playerId || match.player2 === playerId) {
        io.to(match.roomId).emit('opponentDisconnected');
        array.splice(index, 1);
        return;
      }
    });

    waitingRooms.find(function (room, index, array) {
      if (room.player1 === playerId) {
        array.splice(index, 1);
        return;
      }
    });
  });
});