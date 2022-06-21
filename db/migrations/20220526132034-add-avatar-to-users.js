'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TABLE users
      ADD COLUMN avatar_name VARCHAR(255); 
    `)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TABLE users
      DROP COLUMN avatar_name; 
    `)
  },
}
