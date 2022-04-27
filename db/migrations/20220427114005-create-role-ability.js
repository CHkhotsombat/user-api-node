'use strict'
module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query(`
      CREATE TABLE role_abilities (
        id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
        role_id INT(11) UNSIGNED NOT NULL,
        ability_id INT(11) UNSIGNED NOT NULL,
        created_at DATETIME NOT NULL,
        updated_at DATETIME NOT NULL,
        FOREIGN KEY (ability_id) REFERENCES abilities(id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE ON UPDATE CASCADE,
        UNIQUE KEY idx_role_id_ability_id (role_id, ability_id)
      );
    `)
  },
  async down(queryInterface) {
    await queryInterface.sequelize.query('DROP TABLE role_abilities;')
  },
}