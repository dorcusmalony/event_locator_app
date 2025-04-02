const { User } = require('../models');

const userController = {
  // Update user preferences
  updatePreferences: async (req, res) => {
    try {
      const { location, preferredCategories } = req.body;

      // Update the user's preferences
      const user = await User.findByPk(req.user.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }

      await user.update({ location, preferredCategories });

      res.status(200).json({ message: 'Preferences updated successfully', user });
    } catch (error) {
      console.error('Error updating preferences:', error);
      res.status(500).json({ error: 'Failed to update preferences' });
    }
  },
};

module.exports = userController;