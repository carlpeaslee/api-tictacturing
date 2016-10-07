'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function ai(tictacboard) {
  var possibleMoves = [];
  for (var squares in tictacboard) {
    if (tictacboard[squares] === 'EMPTY') {
      possibleMoves.push(squares);
    }
  }
  var move = possibleMoves[getRandomInt(0, possibleMoves.length - 1)];
  console.log('ai move:', move);
  return move;
}

exports.default = ai;