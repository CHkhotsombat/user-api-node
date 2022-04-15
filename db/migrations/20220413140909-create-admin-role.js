'use strict'
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      CREATE TABLE admin_roles (
        id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
        admin_id INT(11) NOT NULL,
        role_id INT(11) UNSIGNED NOT NULL,
        created_at DATETIME NOT NULL,
        updated_at DATETIME NOT NULL,
        FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE ON UPDATE CASCADE,
        UNIQUE KEY idx_admin_id_role_id (admin_id, role_id)
      );
    `)
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query('DROP TABLE admin_roles;')
  },
}