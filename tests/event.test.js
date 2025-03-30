const request = require('supertest');
const app = require('../app');
const sequelize = require('../config/database');
const Event = require('../models/event');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Event Endpoints', () => {
  it('should create a new event', async () => {
    const res = await request(app)
      .post('/events')
      .send({
        title: 'Test Event',
        description: 'This is a test event',
        location: { type: 'Point', coordinates: [0, 0] },
        date: '2025-04-01T00:00:00Z',
        categories: ['music'],
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should get all events', async () => {
    const res = await request(app).get('/events');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should update an event', async () => {
    const event = await Event.create({
      title: 'Old Event',
      description: 'This is an old event',
      location: { type: 'Point', coordinates: [0, 0] },
      date: '2025-04-01T00:00:00Z',
      categories: ['sports'],
    });

    const res = await request(app)
      .put(`/events/${event.id}`)
      .send({
        title: 'Updated Event',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('title', 'Updated Event');
  });

  it('should delete an event', async () => {
    const event = await Event.create({
      title: 'Event to Delete',
      description: 'This event will be deleted',
      location: { type: 'Point', coordinates: [0, 0] },
      date: '2025-04-01T00:00:00Z',
      categories: ['music'],
    });

    const res = await request(app).delete(`/events/${event.id}`);
    expect(res.statusCode).toEqual(204);
  });
});