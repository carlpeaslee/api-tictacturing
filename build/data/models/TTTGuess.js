'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

var _Match = require('./Match');

var _Match2 = _interopRequireDefault(_Match);

var _Player = require('./Player');

var _Player2 = _interopRequireDefault(_Player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TTTGuess = _db2.default.define('TTTGuess', {

  guessId: {
    type: _sequelize2.default.STRING,
    defaultValue: _sequelize2.default.UUIDV1,
    primaryKey: true,
    allowNull: false
  },

  matchId: {
    type: _sequelize2.default.STRING,
    allowNull: false
  },

  playerId: {
    type: _sequelize2.default.STRING
  },

  guessedRobot: {
    type: _sequelize2.default.BOOLEAN,
    allowNull: false
  }

});

exports.default = TTTGuess;