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
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Admin',
    tableName: 'admins',
    paranoid: true,
    timestamp: true,
    indexes: [
      {
        fields: ['email', 'deletedAt'],
        name: 'idxUsersEmailDeletedAt',
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