
const Discord = require('discord.js')
const client = new Discord.Client()
const auth = require('./config/auth.json')

const game = require('./game/index.js')

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', function (msg) {
  const embed = game.route(msg.content, msg.author)
  if (embed) msg.channel.send(embed)
})

client.login(auth.token)
