'use strict'
const {
  Model,
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class AdminRole extends Model {
    static associate(models) {
      this.belongsTo(models.Admin, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        foreignKey: 'admin_id',
      })
      this.belongsTo(models.Role, { 
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        foreignKey: 'role_id',
      })
    }
  }
  AdminRole.init({
    adminId: {
      type: DataTypes.INTEGER,
      field: 'admin_id',
      references: {
        model: 'Admin',
        key: 'id',
      },
    },
    roleId: {
      type: DataTypes.INTEGER,
      field: 'role_id',
      references: {
        model: 'Role',
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
    deletedAt: {
      type: DataTypes.DATE,
      field: 'deleted_at',
    },
  }, {
    sequelize,
    modelName: 'AdminRole',
    tableName: 'admin_roles',
    timestamp: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  })

  return AdminRole
}