
const Format = require('./format-msg.js')
const Settings = require('../config/settings.json')
const Engine = require('./engine.js')
const Handlers = require('./handlers.js')

module.exports = {

  async route (msg) {
    if (!msg.content.startsWith(Settings.trigger)) return
    const params = msg.content.replace(Settings.trigger, '').trim().split(' ')
    const [command, ...args] = params

    const match = Object.values(this.handlers).find(item => {
      return item.phrases.includes(command.toLowerCase())
    })

    if (match) {
      const eng = await Engine(msg.author.username)
      await eng.findGame()
      match.handler(eng, msg, args)
    } else {
      this.instructions(msg)
    }
  },

  instructions (msg) {
    const res = Format.setup()
      .setTitle('Instructions for playing')

    Object.values(this.handlers).forEach(handler => {
      res.addField(`${Settings.trigger} ${handler.phrases[0]}`, handler.description)
    })

    return msg.channel.send(res)
  },

  handlers: {
    newGame: {
      phrases: ['play'],
      description: 'Start a new game of Black Jack',
      handler: Handlers.newGame
    },

    balance: {
      phrases: ['balance'],
      description: 'View your credits balance',
      handler: Handlers.balance
    },

    quit: {
      phrases: ['quit', 'leave'],
      description: 'Quit current game',
      handler: Handlers.quit

    },

    done: {
      phrases: ['stay', 'done'],
      description: 'I have all the cards I need',
      handler: Handlers.done
    },

    hit: {
      phrases: ['hit', 'hit me', 'hit'],
      description: 'Get another card',
      handler: Handlers.hit
    }

  }
}
