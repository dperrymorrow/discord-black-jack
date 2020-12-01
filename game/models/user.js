
'use strict'
const { model: Model, Schema } = require('./db')

const user = new Schema(
  {
    username: String,
    credits: Number
  },
  { timestamps: { createdAt: 'created_at' } }
)

module.exports = Model('User', user)
