'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TABLE users
      MODIFY password VARCHAR(255); 
    `)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TABLE users
      MODIFY password VARCHAR(255) NOT NULL; 
    `)
  },
}
