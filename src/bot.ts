import * as Discord from 'discord.js'
import { handleMessage } from './handler'
require('dotenv').config()

const client = new Discord.Client()

client.on('ready', () => {
  console.log('🚀 Started Wavr bot...')
  client.user.setPresence({
    status: 'online',
    activity: {
      name: 'with money',
      type: 'PLAYING',
      url: 'https://wavr.me/',
    },
  })
})

client.on('message', (message) => {
  if (message.author.bot) {
    return
  }

  handleMessage(message)
})

client.login(process.env.BOT_TOKEN)
