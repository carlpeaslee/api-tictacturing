'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _BlogPost = require('../models/BlogPost');

var _BlogPost2 = _interopRequireDefault(_BlogPost);

var _graphql = require('graphql');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addBlogPost = {
  type: _graphql.GraphQLString,
  args: {
    title: {
      type: _graphql.GraphQLString
    },
    author: {
      type: _graphql.GraphQLString
    },
    publicationDate: {
      type: _graphql.GraphQLString
    },
    featuredImage: {
      type: _graphql.GraphQLString
    },
    content: {
      type: _graphql.GraphQLString
    }
  },
  resolve: function resolve(source, args, context) {
    console.log('addBlogPost context.permissions', context.permissions);
    console.log(new Date(args.publicationDate));
    if (context.permissions[0] == 0) {
      console.log('adding blogPost');
      buildBlogPost(args.title, args.author, args.publicationDate, args.featuredImage, args.content);
      return "blogPost created good job";
    } else {
      console.log('didnt see a 0');
      return "sorry you don't have proper permissions to create a blog post";
    }
  }
};

function buildBlogPost(title, author, publicationDate, featuredImage, content) {
  console.log('buildBlogPost');
  _BlogPost2.default.build({
    title: title,
    author: author,
    publicationDate: publicationDate,
    featuredImage: featuredImage,
    content: content
  }).save().then(function (anotherTask) {
    return "wow success!";
  }).catch(function (error) {
    console.log(error);
  });
}

exports.default = addBlogPost;