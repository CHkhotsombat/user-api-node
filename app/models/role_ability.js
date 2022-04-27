'use strict'
const {
  Model,
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class RoleAbility extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Role, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        foreignKey: 'role_id',
      })
      this.belongsTo(models.Ability, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        foreignKey: 'ability_id',
      })
    }
  }
  RoleAbility.init({
    roleId: {
      type: DataTypes.INTEGER,
      field: 'role_id',
      references: {
        model: 'Role',
        key: 'id',
      },
    },
    abilityId: {
      type: DataTypes.INTEGER,
      field: 'ability_id',
      references: {
        model: 'Ability',
        key: 'id',
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
    modelName: 'RoleAbility',
    tableName: 'role_abilities',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  })
  return RoleAbility
}