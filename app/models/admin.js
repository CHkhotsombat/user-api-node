'use strict'
import { Model } from 'sequelize'
import bcrypt from 'bcrypt'

module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Admin.init({
    firstName: {
      type: DataTypes.STRING,
      field: 'first_name',
    },
    lastName: {
      type: DataTypes.STRING,
      field: 'last_name',
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
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
    modelName: 'Admin',
    tableName: 'admins',
    paranoid: true,
    timestamp: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    indexes: [
      {
        fields: ['email', 'deleted_at'],
        name: 'idx_admins_email_deleted_at',
      },
    ],
    hooks: {
      beforeSave: async (admin) => {
        if (admin.password) {
          const salt = await bcrypt.genSaltSync(10, 'a')
          admin.password = bcrypt.hashSync(admin.password, salt)
        }
      },
    },
  })

  return Admin
}