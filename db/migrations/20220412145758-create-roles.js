'use strict'
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      CREATE TABLE roles (
        id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
        code VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        deleted_at DATETIME,
        created_at DATETIME NOT NULL,
        updated_at DATETIME NOT NULL
      );
    `)
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query('DROP TABLE roles')
  },
}