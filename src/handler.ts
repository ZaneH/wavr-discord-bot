import * as Discord from 'discord.js'
import { Message, MessageEmbed } from 'discord.js'
import { getProduct } from './api'
import { noHTML, truncateString } from './utils'

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
}

const handleVote = (message: Message) => {
  const embed = new Discord.MessageEmbed({
    title: 'Vote for Wavr bot',
    description: '(Coming soon) Earn Ad Tokens for each vote!',
    color: 14035221,
    footer: {
      iconURL: 'https://wavr.me/img/w-sm-125.png',
      text: 'Wavr bot',
    },
    fields: [
      {
        name: 'Earn 0.05 Ad Tokens every 12 hours',
        value: '[top.gg](https://top.gg/bot/762914158500511775)',
      },
      {
        name: 'Earn 0.075 Ad Tokens every 24 hours',
        value:
          '[Discord Bot List](https://discordbotlist.com/bots/wavr/upvote)\n[Bots for Discord](https://botsfordiscord.com/bot/762914158500511775/vote)',
      },
    ],
  })

  message.channel.send(embed)
}

const handlePack = async (message: Message) => {
  const productId = message.content.split('/').pop()
  const product = await getProduct({ id: productId })

  console.log(product)

  const embed = new Discord.MessageEmbed({
    title: product.name,
    description: truncateString(noHTML(product.description) ?? '', 35),
    url: `https://wavr.me/pack/${productId}`,
    color: 14035221,
    footer: {
      iconURL: 'https://wavr.me/img/w-sm-125.png',
      text: 'Wavr bot',
    },
    image: {
      url: `${
        product.images?.[0] ??
        'https://wavr.s3.us-east-2.amazonaws.com/!blank+thumbnail'
      }`,
    },
    author: {
      name: `${product.owner?.displayName ?? product.owner?.username}`,
      url: `https://wavr.me/user/${product.owner?.username}`,
      iconURL: `${
        product.owner?.avatarURL ??
        'https://wavr.s3.us-east-2.amazonaws.com/!blank+thumbnail'
      }`,
    },
    fields: [
      {
        name: 'Price:',
        value: `${
          product.onSale
            ? `On sale: $${product.salePrice.toFixed(2)}`
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
