const express = require('express'); // Import express
const session = require('express-session');
const passport = require('passport');
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const sequelize = require('./config/database');

const userRoutes = require('./routes/userRoutes');
const app = express();
// Your existing code.

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Register routes

app.use('/auth', authRoutes);
app.use('/events', eventRoutes);
app.use('/user', userRoutes);

// Sync database and start server only if not in test environment
if (process.env.NODE_ENV !== 'test') {
  sequelize.sync()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });
}

module.exports = app;