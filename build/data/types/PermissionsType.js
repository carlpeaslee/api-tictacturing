'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _PermissionType = require('./PermissionType');

var _PermissionType2 = _interopRequireDefault(_PermissionType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PermissionsType = new _graphql.GraphQLList(_PermissionType2.default);

exports.default = PermissionsType;