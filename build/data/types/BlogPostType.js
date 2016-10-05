'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var BlogPostType = new _graphql.GraphQLObjectType({
  name: 'BlogPost',
  description: 'An object that describes a blog post',
  fields: {
    title: {
      type: _graphql.GraphQLString
    },
    blogPostId: {
      type: _graphql.GraphQLID
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
  }
});

exports.default = BlogPostType;