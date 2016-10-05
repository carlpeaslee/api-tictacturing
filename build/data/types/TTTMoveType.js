'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var TTTMoveType = new _graphql.GraphQLObjectType({
  name: 'TTTMove',
  description: 'An object that describes a move in a tictactoe game',
  fields: {
    moveId: _graphql.GraphQLID,

    matchId: _graphql.GraphQLID,

    playerId: _graphql.GraphQLID,

    position: _graphql.GraphQLInt
  }
});

exports.default = TTTMoveType;