'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Person = require('../models/Person');

var _Person2 = _interopRequireDefault(_Person);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function PermissionsHandler(personId) {
  return new Promise(function (resolve, reject) {
    _Person2.default.findOrCreate({
      where: {
        personId: personId
      },
      defaults: {
        name: '',
        email: '',
        permissions: [1]
      }
    }).spread(function (result) {
      if (result) {
        resolve(result.dataValues);
      }
    });
  });
}

exports.default = PermissionsHandler;