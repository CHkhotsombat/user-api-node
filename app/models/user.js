import bcrypt from 'bcrypt'
import crypto from 'crypto'

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
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
        field: 'email',
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: 'Please enter an email',
          },
          isEmail: {
            msg: 'Please enter a valid email address.',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
      },
      status: {
        allowNull: false,
        type: DataTypes.ENUM('IN_ACTIVE', 'ACTIVE', 'UN_CONFIRM_EMAIL'),
        defaultValue: 'UN_CONFIRM_EMAIL',
      },
      emailConfirmedAt: {
        type: DataTypes.STRING,
        field: 'email_confirmed_at',
      },
      emailConfirmationToken: {
        type: DataTypes.STRING,
        field: 'email_confirmation_token',
      },
      avatarName: {
        type: DataTypes.STRING,
        field: 'avatar_name',
      },
      deletedAt: {
        type: DataTypes.DATE,
        field: 'deleted_at',
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at',
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      indexes: [
        {
          unique: true,
          fields: ['email', 'deleted_at'],
          name: 'idx_users_email_deleted_at',
        },
      ],
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            const salt = await bcrypt.genSaltSync(10, 'a')
            user.password = bcrypt.hashSync(user.password, salt)
          }
          user.emailConfirmationToken = crypto.randomBytes(16).toString('hex')
          user.deletedAt = null
        },
      },
    }
  )

  return User
}
