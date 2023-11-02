const { Thought, User } = require('../models'); // Import your Thought and User models

module.exports  = {
  // Get all thoughts
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get a single thought by its _id
  async getThoughtById(req, res) {
    try {
      const { thoughtId } = req.params;
      const thought = await Thought.findById(thoughtId);
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Create a new thought
  async createThought(req, res) {
    try {
      const { thoughtText, username, userId } = req.body;
      const thought = await Thought.create({ thoughtText, username, userId });

      // Push the thought's _id to the associated user's thoughts array
      await User.findByIdAndUpdate(userId, { $push: { thoughts: thought._id } });

      res.json(thought);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // Update a thought by its _id
  async updateThought(req, res) {
    try {
      const { thoughtId } = req.params;
      const { thoughtText } = req.body;
      const thought = await Thought.findByIdAndUpdate(thoughtId, { thoughtText }, { new: true });

      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }

      res.json(thought);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // Remove a thought by its _id
  async deleteThought(req, res) {
    try {
      const { thoughtId } = req.params;
      const thought = await Thought.findByIdAndDelete(thoughtId);

      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Create a reaction stored in a single thought's reactions array field
  async createReaction(req, res) {
    try {
      const { thoughtId } = req.params;
      const { reactionBody, username } = req.body;

      const thought = await Thought.findByIdAndUpdate(
        thoughtId,
        { $push: { reactions: { reactionBody, username } } },
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }

      res.json(thought);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // Remove a reaction by the reaction's reactionId value
  async removeReaction(req, res) {
    try {
      const { thoughtId, reactionId } = req.params;

      const thought = await Thought.findByIdAndUpdate(
        thoughtId,
        { $pull: { reactions: { _id: reactionId } } },
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};


