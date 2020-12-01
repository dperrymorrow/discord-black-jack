
const Format = require('./format-msg.js')

module.exports = {
  async newGame (eng, msg, [amount]) {
    if (eng.game) {
      msg.channel.send(Format.setup().setTitle(`I found one we are still playing.`))
      msg.channel.send(Format.showGame(eng.game))
      return
    }

    if (!amount) {
      msg.channel.send(Format.setup().setTitle(`You have to place a bet like, \`!play 100\`. You have ${eng.user.credits.toLocaleString()} credits`))
      return
    }

    await eng.createGame(amount)
    msg.channel.send(Format.setup().setTitle(`ok, ${msg.author.username} lets play a new game`))
    msg.channel.send(Format.showGame(eng.game))
  },

  async quit (eng, msg) {
    await eng.quit()
    msg.channel.send(Format.setup().setTitle(`ok, ${msg.author.username} Ok, bye bye`))
  },

  async hit (eng, msg) {
    if (!eng.game) {
      msg.channel.send(Format.setup().setTitle('Start a game first `!new game`'))
      return
    }

    await eng.hit()

    msg.channel.send(Format.setup().setTitle(`ok, ${msg.author.username} I gave you another card`))
    msg.channel.send(Format.showGame(eng.game))

    if (eng.userBusted) {
      msg.channel.send(Format.setup().setTitle(`BUST!, You loose`))
      eng.quit()
    }
  },

  async balance (eng, msg) {
    msg.channel.send(Format.setup().setTitle(`You have  ${eng.user.credits.toLocaleString()} credits`))
  },

  async done (eng, msg, [amount]) {
    if (!eng.game) {
      msg.channel.send(Format.setup().setTitle('Start a game first `!new game`'))
      return
    }

    if (!amount) {
      msg.channel.send(Format.setup().setTitle('You have to specify a raise `!stay 300`'))
      return
    }

    await eng.playDealer(amount)
    msg.channel.send(Format.showGame(eng.game))

    if (eng.dealerBusted > 21) {
      msg.channel.send(Format.setup().setTitle(`DEALER BUSTS!, You win`))
    } else if (eng.isWinning) {
      msg.channel.send(Format.setup().setTitle(`You win ${eng.game.wager.toLocaleString()} credits.`))
    } else {
      msg.channel.send(Format.setup().setTitle(`Sorry, you lost, ${eng.game.wager.toLocaleString()} credits.`))
    }

    eng.quit()
  }

}
