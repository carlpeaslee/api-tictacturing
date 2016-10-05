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

var TTTMove = _db2.default.define('TTTMove', {

  moveId: {
    type: _sequelize2.default.UUID,
    defaultValue: _sequelize2.default.UUIDV1,
    primaryKey: true,
    allowNull: false
  },

  matchId: {
    type: _sequelize2.default.UUID,
    allowNull: false,
    references: {
      model: _Match2.default,
      key: 'matchId'
    }
  },

  playerId: {
    type: _sequelize2.default.UUID,
    foreignKey: true,
    allowNull: false,
    references: {
      model: _Player2.default,
      key: 'playerId'
    }
  },

  position: {
    type: _sequelize2.default.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      max: 8
    }
  }

});

exports.default = TTTMove;