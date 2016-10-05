'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var DBHost = exports.DBHost = process.env.DB_HOST || 'localhost';
var DBUser = exports.DBUser = process.env.DB_USER || 'carl';
var DBPw = exports.DBPw = process.env.DB_PW || '';
var DBName = exports.DBName = process.env.DB_NAME || 'tictacturing';
var DBSsl = exports.DBSsl = process.env.DB_SSL || false;