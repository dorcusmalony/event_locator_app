const { Sequelize } = require('sequelize');
const { Event } = require('../models');
const express = require('express');
const router = express.Router();

// Create an event
router.post('/events', async (req, res) => {
  try {
    const { title, description, location, event_date } = req.body;
    if (!title || !location || !event_date) {
      return res.status(400).json({ error: 'Title, location, and event_date are required.' });
    }
    const formattedLocation = `POINT(${location})`;
    const event = await Event.create({
      title,
      description,
      location: Sequelize.fn('ST_GeomFromText', formattedLocation),
      event_date,
    });
    res.status(201).json(event);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Failed to create event' });
  }
});

// Get all events
router.get('/events', async (req, res) => {
  try {
    const events = await Event.findAll();
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// Get an event by ID
router.get('/events/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByPk(id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({ error: 'Failed to fetch event' });
  }
});

// Update an event by ID
router.put('/events/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, location, event_date } = req.body;
    const event = await Event.findByPk(id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    const updatedEvent = await event.update({
      title,
      description,
      location: location ? Sequelize.fn('ST_GeomFromText', `POINT(${location})`) : event.location,
      event_date,
    });
    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ error: 'Failed to update event' });
  }
});

// Delete an event by ID
router.delete('/events/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByPk(id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    await event.destroy();
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ error: 'Failed to delete event' });
  }
});

// Delete all events
router.delete('/events', async (req, res) => {
  try {
    await Event.destroy({ where: {} });
    res.status(200).json({ message: 'All events deleted successfully' });
  } catch (error) {
    console.error('Error deleting all events:', error);
    res.status(500).json({ error: 'Failed to delete all events' });
  }
});
router.get('/events/nearby', async (req, res) => {
  try {
    const { latitude, longitude, radius } = req.query;
    if (!latitude || !longitude || !radius) {
      return res.status(400).json({ error: 'Latitude, longitude, and radius are required' });
    }

    const events = await Event.findAll({
      where: Sequelize.literal(`
        ST_DWithin(
          location::geography,
          ST_SetSRID(ST_MakePoint(${longitude}, ${latitude}), 4326)::geography,
          ${radius}
        )
      `),
    });

    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching nearby events:', error);
    res.status(500).json({ error: 'Failed to fetch nearby events' });
  }
});
// Get all events with pagination
router.get('/events', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Default to page 1, 10 events per page
    const offset = (page - 1) * limit;

    const events = await Event.findAndCountAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    res.status(200).json({
      total: events.count,
      pages: Math.ceil(events.count / limit),
      currentPage: parseInt(page),
      data: events.rows,
    });
  } catch (error) {
    console.error('Error fetching events with pagination:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});
router.get('/events/nearby', async (req, res) => {
  try {
    const { latitude, longitude, radius } = req.query;
    if (!latitude || !longitude || !radius) {
      return res.status(400).json({ error: 'Latitude, longitude, and radius are required' });
    }

    const events = await Event.findAll({
      where: Sequelize.literal(`
        ST_DWithin(
          location::geography,
          ST_SetSRID(ST_MakePoint(${longitude}, ${latitude}), 4326)::geography,
          ${radius}
        )
      `),
    });

    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching nearby events:', error);
    res.status(500).json({ error: 'Failed to fetch nearby events' });
  }
});
// Get nearby events
router.get('/events/nearby', async (req, res) => {
  try {
    const { latitude, longitude, radius } = req.query;
    if (!latitude || !longitude || !radius) {
      return res.status(400).json({ error: 'Latitude, longitude, and radius are required' });
    }

    const events = await Event.findAll({
      where: Sequelize.literal(`
        ST_DWithin(
          location::geography,
          ST_SetSRID(ST_MakePoint(${longitude}, ${latitude}), 4326)::geography,
          ${radius}
        )
      `),
    });

    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching nearby events:', error);
    res.status(500).json({ error: 'Failed to fetch nearby events' });
  }
});



module.exports = router;