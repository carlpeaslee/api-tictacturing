'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Match = _db2.default.define('Match', {

  matchId: {
    type: _sequelize2.default.UUID,
    defaultValue: _sequelize2.default.UUIDV1,
    primaryKey: true,
    allowNull: false
  }

});

exports.default = Match;