'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addMove = addMove;

var _TTTMove = require('../models/TTTMove');

var _TTTMove2 = _interopRequireDefault(_TTTMove);

var _graphql = require('graphql');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var submitMove = {
  type: _graphql.GraphQLString,
  args: {
    moveId: {
      type: _graphql.GraphQLID
    },

    matchId: {
      type: _graphql.GraphQLID
    },

    playerId: {
      type: _graphql.GraphQLID
    },

    position: {
      type: _graphql.GraphQLInt
    }
  },
  resolve: function resolve(source, args, context) {
    console.log('submitMove permissions', context.permissions);
    addMove(args.moveId, args.matchId, args.playerId, args.position);
    return "move submitted, good job";
  }
};

function addMove(moveId, matchId, playerId, position) {
  console.log('addMove');
  _TTTMove2.default.build({
    moveId: moveId,
    matchId: matchId,
    playerId: playerId,
    position: position
  }).save().then(function (anotherTask) {
    return "wow success!";
  }).catch(function (error) {
    console.log(error);
  });
}

exports.default = submitMove;