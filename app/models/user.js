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
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
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
    email_confirmed_at: DataTypes.DATE,
    email_confirmation_token: DataTypes.STRING,
    deleted_at: DataTypes.DATE,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,    
  }, {
    sequelize,
    underscored: true,
    modelName: 'User',
    tableName: 'users',
    paranoid: true,
    timestamp: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    indexes: [
      {
        unique: {
          msg: 'Email is already to used.'
        },
        fields: ['email', 'deleted_at'],
        name: 'idx_users_email_deleted_at'
      }
    ],
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSaltSync(10, 'a');
          user.password = bcrypt.hashSync(user.password, salt);
        }
        user.email_confirmation_token = crypto.randomBytes(16).toString('hex');
        user.deleted_at = null
      }
    }
  });

  return User;
};