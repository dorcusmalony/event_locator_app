
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add only the missing columns
    await queryInterface.addColumn('Users', 'preferredCategories', {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove only the columns added in this migration
    await queryInterface.removeColumn('Users', 'preferredCategories');
  },
};