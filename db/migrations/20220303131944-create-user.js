'use strict'
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable('users', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        firstName: {
          type: Sequelize.STRING,
        },
        lastName: {
          type: Sequelize.STRING,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        status: {
          type: Sequelize.STRING,
          defaultValue: 'UN_CONFIRM_EMAIL',
        },
        emailConfirmationToken: {
          type: Sequelize.STRING,
        },
        emailConfirmedAt: {
          type: Sequelize.DATE,
        },
        deletedAt: {
          type: Sequelize.DATE,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      })
      .then(() =>
        queryInterface.addIndex('users', ['email', 'deletedAt'], {
          name: 'idxUsersEmailDeletedAt',
          unique: true,
        })
      )
  },
  async down(queryInterface) {
    await queryInterface.dropTable('users')
  },
}
