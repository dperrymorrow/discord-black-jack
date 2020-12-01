
const Discord = require('discord.js')
const client = new Discord.Client()
const auth = require('./config/auth.json')

const game = require('./game/index.js')

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
})

client.on('message', (msg) => game.route(msg))
client.login(auth.token)
