// credit: https://medium.com/@DylanAttal/truncate-a-string-in-javascript-41f33171d5a8
export const truncateString = (str, num) => {
  if (str!.length <= num) {
    return str
  }

  return str.slice(0, num) + '...'
}

// credit: https://stackoverflow.com/a/5002161/3411191
export const noHTML = (str) => {
  const clean = str.replace(/<\/?[^>]+(>|$)/g, '')
  return clean
}

var emojis = ['ℹ️', '😄', '🎉', '😎', '❔', '💰', '🙏', '🐲', '🔥', '🔌', '✨']

export const randomEmoji = () => {
  return emojis[Math.floor(Math.random() * emojis.length)]
}
