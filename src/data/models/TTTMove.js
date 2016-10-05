import sequelize from 'sequelize';
import db from '../db';

import Match from './Match'
import Player from './Player'


const TTTMove = db.define('TTTMove', {

  moveId: {
    type: sequelize.UUID,
    defaultValue: sequelize.UUIDV1,
    primaryKey: true,
    allowNull: false
  },

  matchId: {
    type: sequelize.UUID,
    allowNull: false,
    references: {
      model: Match,
      key: 'matchId'
    }
  },

  playerId: {
    type: sequelize.UUID,
    foreignKey: true,
    allowNull: false,
    references: {
      model: Player,
      key: 'playerId'
    }
  },

  position: {
    type: sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      max: 8
    }
  },

});

export default TTTMove
