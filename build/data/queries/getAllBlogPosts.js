'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _BlogPost = require('../models/BlogPost');

var _BlogPost2 = _interopRequireDefault(_BlogPost);

var _BlogPostType = require('../types/BlogPostType');

var _BlogPostType2 = _interopRequireDefault(_BlogPostType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getAllBlogPosts = {
  type: new _graphql.GraphQLList(_BlogPostType2.default),
  resolve: function resolve(source, args, context) {
    console.log('getAllBlogPosts context.permissions', context.permissions);
    return new Promise(function (resolve, reject) {
      _BlogPost2.default.findAll().then(function (result, error) {
        if (error) console.log(error);
        resolve(result);
      });
    });
  }
};

exports.default = getAllBlogPosts;