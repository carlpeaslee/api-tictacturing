'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _PermissionsType = require('./PermissionsType');

var _PermissionsType2 = _interopRequireDefault(_PermissionsType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PersonType = new _graphql.GraphQLObjectType({
  name: 'Person',
  description: 'A user in the database',
  fields: {
    personId: {
      type: _graphql.GraphQLID
    },
    email: {
      type: _graphql.GraphQLString
    },
    name: {
      type: _graphql.GraphQLString
    },
    permissions: {
      type: _PermissionsType2.default
    }
  }
});

exports.default = PersonType;