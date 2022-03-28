'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt');
const crypto = require("crypto");

module.exports = (sequelize, DataTypes) => {  
  const User = sequelize.define(
    'User', 
    {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Email is already to used.'
      }
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    status: {
      allowNull: false,
      type: DataTypes.ENUM('IN_ACTIVE', 'ACTIVE', 'UN_CONFIRM_EMAIL'),
      defaultValue: 'UN_CONFIRM_EMAIL'
    },
    emailConfirmedAt: DataTypes.DATE,
    emailConfirmationToken: DataTypes.STRING,
    deletedAt: DataTypes.DATE,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,    
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    paranoid: true,
    timestamp: true,
    indexes: [
      {
        unique: {
          msg: 'Email is already to used.'
        },
        fields: ['email', 'deletedAt'],
        name: 'idxUsersEmailDeletedAt'
      }
    ],
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSaltSync(10, 'a');
          user.password = bcrypt.hashSync(user.password, salt);
        }
        user.emailConfirmationToken = crypto.randomBytes(16).toString('hex');
        user.deletedAt = null
      }
    }
  });

  return User;
};