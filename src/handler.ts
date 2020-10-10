import * as Discord from 'discord.js'
import { Message, MessageEmbed } from 'discord.js'
import { getProduct } from './api'
import { noHTML, truncateString } from './utils'

const WAVR_EMOJI = '764397755828535306'

export const handleMessage = (message: Message) => {
  const trimmedMessage = message.content.trim()

  // we should always embed links
  if (message.content.indexOf('wavr.me/pack') >= 0) {
    return handlePack(message)
  }

  // return if message doesn't start with 'wavr '
  if (trimmedMessage.indexOf('wavr ') !== 0) {
    return
  }

  if (trimmedMessage === 'wavr vote') {
    return handleVote(message)
  }

  if (trimmedMessage === 'wavr help') {
    return handleHelp(message)
  }
}

const handleHelp = (message: Message) => {
  const embed = new Discord.MessageEmbed({
    title: 'Wavr bot Help',
    description: 'A companion bot for Wavr.me',
    color: 14035221,
    footer: {
      iconURL: 'https://wavr.me/img/w-sm-125.png',
      text: 'Wavr bot',
    },
    fields: [
      {
        name: 'Commands',
        value:
          '- `wavr help` will display this message\n- `wavr vote` will show you where to vote',
      },
      {
        name: 'Functions',
        value: 'Any product URL from Wavr will automatically get an embed',
      },
    ],
  })

  message.channel.send(embed)
}

const handleVote = (message: Message) => {
  const embed = new Discord.MessageEmbed({
    title: 'Vote for Wavr bot',
    description: 'Earn Ad Tokens for each vote!',
    color: 14035221,
    footer: {
      iconURL: 'https://wavr.me/img/w-sm-125.png',
      text: 'Wavr bot',
    },
    fields: [
      {
        name: 'Earn 0.05 Ad Tokens every 12 hours',
        value:
          '[top.gg](https://top.gg/servers/744086647875960853)\n[DiscordServers](https://discordservers.com/bump/744086647875960853)',
      },
      {
        name: 'Earn 0.075 Ad Tokens every 24 hours',
        value: '(Coming soon)',
      },
    ],
  })

  message.channel.send(embed)
}

const handlePack = async (message: Message) => {
  // matches the uuid used in the pack url
  const packRe = /wavr\.me\/pack\/(\w+-\w+-\w+-\w+-\w+)/g
  const productId = packRe.exec(message.content)[1]!

  const product = await getProduct({ id: productId })

  const salePriceWithSign = `$${product.salePrice.toFixed(2)}`
  const embed = new Discord.MessageEmbed({
    title: product.name,
    description: truncateString(noHTML(product.description) ?? '', 45),
    url: `https://wavr.me/pack/${productId}`,
    color: 14035221,
    footer: {
      iconURL: 'https://wavr.me/img/w-sm-125.png',
      text: 'Wavr bot',
    },
    image: {
      url: `${
        product.images?.[0] ?? 'https://wavr.me/img/blank-thumbnail.png'
      }`,
    },
    author: {
      name: `${product.owner?.displayName ?? product.owner?.username}`,
      url: `https://wavr.me/user/${product.owner?.username}`,
      iconURL: `${
        product.owner?.avatarURL ?? 'https://wavr.me/img/blank-thumbnail.png'
      }`,
    },
    fields: [
      {
        name: 'Price:',
        value: `${
          product.onSale
            ? `~~$${product.amount.toFixed(2)}~~\nOn sale: ${
                product.salePrice === 0 ? 'Free' : salePriceWithSign
              }`
            : product.amount === 0
            ? 'Free'
            : `$${product.amount.toFixed(2)}`
        }`,
      },
      {
        name: 'Tags:',
        value:
          product.tags?.length > 0
            ? product.tags?.map((tag) => tag.name).join(', ')
            : '(none)',
      },
      {
        name: 'Sold by:',
        value: `${
          product.owner?.displayName
            ? `${product.owner?.displayName} (@${product.owner?.username})`
            : product.owner?.username
        }`,
      },
    ],
  })

  return message.channel.send(embed)
}
