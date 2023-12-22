const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mtg-app', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB', error);
  });

// Create a model based on the schema
const Game = require('./models/game');

// Define an API endpoint to retrieve all game data
app.get('/games', async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Define an API endpoint to create a new game
app.post('/games/new', async (req, res) => {
  try {
    const game = new Game(req.body);
    console.log('req', req.body)
    await game.save();
    res.json(game);
  } catch (error) {
    console.log('error', error)
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Define an API endpoint to retrieve game data by ID
app.get('/games/:id', async (req, res) => {
  try {
    const game = await Game.findOne({ _id: req.params.id });
    if (game) {
      res.json(game);
    } else {
      res.status(404).json({ error: 'Game not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Define an API endpoint to delete a game
app.delete('/games/:id', async (req, res) => {
  try {
    const game = await Game.findOne({ _id: req.params.id });
    if (game) {
      await game.remove();
      res.json({ message: 'Game deleted' });
    } else {
      res.status(404).json({ error: 'Game not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Define an API endpoint to update a game
app.put('/games/:id', async (req, res) => {
  try {
    const game = await Game.findOne({ _id: req.params.id });
    if (game) {
      game.title = req.body.title;
      game.description = req.body.description;
      game.players = req.body.players;
      await game.save();
      res.json(game);
    } else {
      res.status(404).json({ error: 'Game not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
