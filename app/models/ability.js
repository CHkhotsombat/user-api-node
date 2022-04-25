'use strict'
const {
  Model,
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Ability extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Ability.init({
    name: {
      type: DataTypes.STRING,
      unique: {
        agrs: true,
        msg: 'Name must be unique',
      },
    },
    code: {
      type: DataTypes.STRING,
      unique: {
        agrs: true,
        msg: 'Name must be unique',
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at',
    },
  }, {
    sequelize,
    modelName: 'Ability',
    tableName: 'abilities',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        unique: {
          msg: 'Name must be unique',
        },
        fields: 'name',
        name: 'idx_ability_name',
      },
      {
        unique: true,
        fields: 'code',
        name: 'idx_ability_code',
      },
    ],
  })
  return Ability
}