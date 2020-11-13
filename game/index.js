
const Format = require('./format-msg.js')
const Settings = require('../config/settings.json')

module.exports = {

  route (phrase, author) {
    if (!phrase.startsWith(Settings.trigger)) return null

    const match = Object.values(this.handlers).find(item => {
      return item.phrases.includes(phrase.replace(/\$\s+/g, '').toLowerCase())
    })

    return match ? match.handler(author) : this.instructions()
  },

  instructions () {
    const msg = Format()
      .setTitle('Instructions for playing')

    Object.values(this.handlers).forEach(handler => {
      msg.addField(`${Settings.trigger} ${handler.phrases[0]}`, handler.description, true)
    })

    return msg
  },

  handlers: {
    newGame: {
      phrases: ['new game', 'lets play'],
      description: 'Start a new game of Black Jack',
      handler (author) {
        const msg = Format()
        return msg.setTitle(`ok, ${author.username} lets play a new game`)
      }
    },

    hit: {
      phrases: ['hit me', 'give me another', 'hit'],
      description: 'Get another card',
      handler (author) {
        const msg = Format()
        return msg.setTitle(`ok ${author.username} here is your card`)
      }
    },

    quit: {
      phrases: ['quit', 'i quit'],
      description: 'Quite playing this hand',
      handler (author) {
        const msg = Format()
        return msg.setTitle(`sorry ${author.username}, were you not having fun?`)
      }
    }
  }
}
