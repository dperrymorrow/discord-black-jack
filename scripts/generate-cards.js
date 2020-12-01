
const fs = require('fs')

const cards = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King']
const suits = [
  { symbol: '♤', name: 'Spades' },
  { symbol: '♧', name: 'Clubs' },
  { symbol: '♡', name: 'Hearts' },
  { symbol: '♢', name: 'Diamonds' }
]

const output = []

cards.forEach(card => {
  suits.forEach(suit => {
    const display = `${suit.symbol} ${isNaN(card) ? card.substr(0, 1) : card}`
    const points = isNaN(card) ? card === 'Ace' ? 1 : 10 : card
    output.push({suit: suit.name, display, points})
  })
})

fs.writeFileSync('./config/cards.json', JSON.stringify(output, null, 2))
