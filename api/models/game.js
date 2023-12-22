const mongoose = require('mongoose');
const { Schema } = mongoose;

const gameSchema = new Schema({
  date: { type: Date, default: Date.now },
  format: { type: String, default: "Commander" },
  decks: [{
    player: { type: String, required: true },
    commander: { type: String, required: true },
    colours: { type: Array , required: true },
    strategy: { type: Array, required: true },
    win: { type: Boolean, default: false },
    turn: { type: Number, default: null },
    altWin: { type: String, default: null },
    mulligans: { type: Number, default: 0 },
    turn1Ring: { type: Boolean, default: false },
    kills: { type: Number, default: 0 },
    firstBlood: { type: Boolean, default: false },
  }],
  notes: { type: String, default: null },
});

const game = mongoose.model('Game', gameSchema);

module.exports = game;