'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Person = require('../models/Person');

var _Person2 = _interopRequireDefault(_Person);

var _graphql = require('graphql');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createPerson = {
  type: _graphql.GraphQLString,
  args: {
    personId: {
      type: _graphql.GraphQLString
    },
    email: {
      type: _graphql.GraphQLString
    },
    name: {
      type: _graphql.GraphQLString
    },
    permissions: {
      type: _graphql.GraphQLString
    }
  },
  resolve: function resolve(source, args, context) {
    buildPerson(args.personId, args.email, args.name, args.permissions);
    return "person created good job!";
  }
};

function buildPerson(personId, email, name, permissions) {
  _Person2.default.build({
    personId: personId,
    email: email,
    name: name,
    permissions: permissions
  }).save().then(function (anotherTask) {
    return "wow success!";
  }).catch(function (error) {
    console.log(error);
  });
}

exports.default = createPerson;