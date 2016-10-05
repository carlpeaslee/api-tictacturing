'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BlogPost = _db2.default.define('BlogPost', {

  blogPostId: {
    type: _sequelize2.default.UUID,
    defaultValue: _sequelize2.default.UUIDV1,
    primaryKey: true
  },

  title: {
    type: _sequelize2.default.STRING
  },

  author: {
    type: _sequelize2.default.STRING
  },

  publicationDate: {
    type: _sequelize2.default.DATE
  },

  featuredImage: {
    type: _sequelize2.default.STRING
  },

  content: {
    type: _sequelize2.default.TEXT
  }
});

exports.default = BlogPost;