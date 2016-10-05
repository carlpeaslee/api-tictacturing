'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _Person = require('../models/Person');

var _Person2 = _interopRequireDefault(_Person);

var _PersonType = require('../types/PersonType');

var _PersonType2 = _interopRequireDefault(_PersonType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getPersonPermissions = {
  type: _PersonType2.default,
  args: {
    personId: {
      type: _graphql.GraphQLString
    }
  },
  resolve: function resolve(source, args, context) {
    return new Promise(function (resolve, reject) {
      console.log('searching using', args.personId);
      _Person2.default.findById(args.personId).then(function (result) {
        console.log('made it into findOnePersonById callback');
        // if (error) {console.log(error)}
        // if (result) {console.log(result)}
        resolve(result);
      });
    });
  }
};

exports.default = getPersonPermissions;