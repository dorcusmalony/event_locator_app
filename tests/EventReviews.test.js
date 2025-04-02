const { sequelize, EventReview } = require('./models');

async function testEventReview() {
  try {
    await sequelize.authenticate();
    console.log('Database connection established.');

    const review = await EventReview.create({
      eventId: 1, // Replace with a valid event ID from your Events table
      reviewText: 'Amazing event!',
      rating: 5,
    });

    console.log('EventReview created:', review.toJSON());
  } catch (error) {
    console.error('Error testing EventReview model:', error);
  } finally {
    await sequelize.close();
  }
}

testEventReview();