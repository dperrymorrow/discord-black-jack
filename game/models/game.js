
'use strict'
const { model: Model, Schema } = require('./db')

const game = new Schema(
  {
    username: String,
    userCards: Array,
    dealerCards: Array,
    dealerTotal: Number,
    userTotal: Number,
    wager: Number
  },
  { timestamps: { createdAt: 'created_at' } }
)

module.exports = Model('Game', game)
