'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Person = _db2.default.define('Person', {

  personId: {
    type: _sequelize2.default.STRING,
    primaryKey: true,
    notNull: true
  },

  email: {
    type: _sequelize2.default.STRING,
    isEmail: true,
    notNull: true
  },

  name: {
    type: _sequelize2.default.STRING,
    notNull: true
  },

  permissions: {
    type: _sequelize2.default.ARRAY(_sequelize2.default.INTEGER),
    defaultValue: [1],
    notNull: true
  }

});

exports.default = Person;