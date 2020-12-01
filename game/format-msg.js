
const Discord = require('discord.js')
const Settings = require('../config/settings.json')

function _display (cards, dealer = false) {
  return cards.map(({display}) => display).join(' ')
}

module.exports = {

  setup () {
    return new Discord.MessageEmbed()
      .setColor('#0099ff')
      // .setAuthor(Settings.appName)
  },

  showGame (game) {
    const res = this.setup()

    res.addField(_display(game.userCards), `**Your total:** ${game.userTotal}pts`)
    res.addField(_display(game.dealerCards), `**Dealer total:** ${game.dealerTotal}pts`)

    return res
  }
}
