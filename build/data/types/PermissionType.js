'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

// const PermissionType = new GraphQLEnumType({
//   name: 'Permission',
//   values: {
//     ADMIN: {values: 0},
//     BASIC: {values: 1},
//     USER: {values: 2},
//   }
// })

var PermissionType = _graphql.GraphQLInt;

exports.default = PermissionType;