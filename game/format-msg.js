
const Discord = require('discord.js')
const Settings = require('../config/settings.json')

module.exports = function () {
  return new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/King_playing_cards.jpg/1200px-King_playing_cards.jpg')
    .setAuthor(Settings.appName)
    // .setTimestamp()
    // .setFooter(Settings.footer)

    // .setURL('https://discord.js.org/')
    // .setDescription(message)
    // .addFields(
    //   { name: 'Regular field title', value: 'Some value here' },
    //   { name: '\u200B', value: '\u200B' }, // this is a separator
    //   { name: 'Inline field title', value: 'Some value here', inline: true },
    //   { name: 'Inline field title', value: 'Some value here', inline: true },
    // )
    // .addField('Inline field title', 'Some value here', true)
    // .setImage('https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/King_playing_cards.jpg/1200px-King_playing_cards.jpg')
}
