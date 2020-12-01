'use strict'
const mongoose = require('mongoose')
const auth = require('../../config/auth.json')

mongoose.connect(auth.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

module.exports = mongoose
