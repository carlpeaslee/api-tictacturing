'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _BlogPost = require('./models/BlogPost');

var _BlogPost2 = _interopRequireDefault(_BlogPost);

var _addBlogPost = require('./mutations/addBlogPost');

var _addBlogPost2 = _interopRequireDefault(_addBlogPost);

var _createPerson = require('./mutations/createPerson');

var _createPerson2 = _interopRequireDefault(_createPerson);

var _submitMove = require('./mutations/submitMove');

var _submitMove2 = _interopRequireDefault(_submitMove);

var _getAllBlogPosts = require('./queries/getAllBlogPosts');

var _getAllBlogPosts2 = _interopRequireDefault(_getAllBlogPosts);

var _getPersonPermissions = require('./queries/getPersonPermissions');

var _getPersonPermissions2 = _interopRequireDefault(_getPersonPermissions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RootQuery = new _graphql.GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    getAllBlogPosts: _getAllBlogPosts2.default,
    getPersonPermissions: _getPersonPermissions2.default
  }
});

var RootMutation = new _graphql.GraphQLObjectType({
  name: 'RootMutation',
  description: 'The root mutation',
  fields: {
    createPerson: _createPerson2.default,
    addBlogPost: _addBlogPost2.default,
    submitMove: _submitMove2.default
  }
});

var schema = new _graphql.GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
});

exports.default = schema;