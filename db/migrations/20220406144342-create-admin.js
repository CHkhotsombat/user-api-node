'use strict'
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('admins', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      first_name: {
        type: Sequelize.STRING,
      },
      last_name: {
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
      deleted_at: {
        type: Sequelize.DATE,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }).then(() =>
      queryInterface.addIndex('admins', ['email', 'deleted_at'], {
        name: 'idx_admins_email_deleted_at',
      })
    ).then(() => 
      queryInterface.addConstraint('admins', {
        fields: ['email', 'deleted_at'],
        type: 'unique',
        name: 'uniq_email_delete_at_constraint',
      })
    )
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('admins')
  },
}