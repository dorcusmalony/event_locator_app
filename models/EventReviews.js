'use strict';

module.exports = (sequelize, DataTypes) => {
  console.log('Initializing EventReview model'); // Add logging

  const EventReview = sequelize.define('EventReview', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'events', // Ensure this matches the table name in your database
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    reviewText: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'EventReviews', // Explicitly set the table name
  });

  console.log('EventReview model initialized successfully'); // Add logging

  EventReview.associate = (models) => {
    console.log('Associating EventReview model'); // Add logging
    EventReview.belongsTo(models.Event, {
      foreignKey: 'eventId',
      as: 'event',
    });
  };

  return EventReview;
};
