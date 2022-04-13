'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      INSERT INTO roles (code, name, created_at, updated_at)
      VALUES 
        ('admin', 'Admin', NOW(), NOW()),
        ('user_admin', 'User admin', NOW(), NOW());
    `)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      DELETE FROM roles WHERE code IN ('admin', 'user_admin');
    `)
  },
}
