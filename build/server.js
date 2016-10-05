'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressGraphql = require('express-graphql');

var _expressGraphql2 = _interopRequireDefault(_expressGraphql);

var _schema = require('./data/schema');

var _schema2 = _interopRequireDefault(_schema);

var _expressJwt = require('express-jwt');

var _expressJwt2 = _interopRequireDefault(_expressJwt);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _db = require('./data/db');

var _db2 = _interopRequireDefault(_db);

var _PermissionsHandler = require('./data/mutations/PermissionsHandler');

var _PermissionsHandler2 = _interopRequireDefault(_PermissionsHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.set('port', process.env.PORT || 3001);

// PRODUCTION
var secret = process.env.AUTH_SECRET;

//DEVELOPMENT
// import authSecret from '../authSecret'
// const secret = authSecret


var jwtCheck = (0, _expressJwt2.default)({
  secret: new Buffer(secret, 'base64'),
  audience: 'ygUSzo55mYxKoOuUAQAsxAwKqkuG0YvM',
  credentialsRequired: false
});

function permissionsMiddleware(req, res, next) {
  if (!req.user) {
    req.permissions = [1];
    next();
  } else {
    var requesterId = req.user.sub;
    (0, _PermissionsHandler2.default)(requesterId).then(function (person) {
      req.permissions = person.permissions;
      next();
    });
  }
}

var corsOptions = {
  origin: true,
  credentials: true
};

app.use('/graphql', [(0, _cors2.default)(corsOptions), jwtCheck, permissionsMiddleware], (0, _expressGraphql2.default)(function (req) {
  return {
    schema: _schema2.default,
    graphiql: true,
    context: {
      permissions: req.permissions
    },
    pretty: true
  };
}));

_db2.default.sync().then(function (err) {
  console.log('It worked!');
}, function (err) {
  console.log('An error occurred while creating the table:', err);
});

app.listen(app.get('port'), function () {
  console.log('Find the server at: http://localhost:' + app.get('port') + '/'); // eslint-disable-line no-console
});