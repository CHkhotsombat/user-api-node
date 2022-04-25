'use strict'
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      CREATE TABLE abilities (
        id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
        name VARCHAR(255) NOT NULL,
        code VARCHAR(255) NOT NULL,
        created_at DATETIME NOT NULL,
        updated_at DATETIME NOT NULL,
        UNIQUE KEY idx_ability_name (name),
        UNIQUE KEY idx_ability_code (code)
      );
    `)
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query('DROP TABLE abilities;')
  },
}