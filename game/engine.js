
const Game = require('./models/game.js')
const Cards = require('../config/cards.json')
const User = require('./models/user.js')

module.exports = async function (username) {
  let game = null
  let user = await User.findOne({username})
  if (!user) user = await User.create({username, credits: 1000})

  return {
    calcTotals () {
      function _calc (cards) {
        let total = cards.reduce((sum, card) => {
          sum += card.points
          return sum
        }, 0)

        cards.filter(card => card.points === 1).forEach(ace => {
          if (total <= 11) total += 10
        })

        return total
      }

      this.game.userTotal = _calc(this.game.userCards)
      this.game.dealerTotal = _calc(this.game.dealerCards)
    },

    get isWinning () {
      return this.game.userTotal > this.game.dealerTotal || this.dealerBusted
    },

    get isLoosing () {
      return this.game.dealerTotal >= this.game.userTotal || this.userBusted
    },

    get userBusted () {
      return this.game.userTotal > 21
    },

    get dealerBusted () {
      return this.game.dealerTotal > 21
    },

    getCard () {
      const usedCards = this.game ? this.game.userCards.concat(this.game.dealerCards) : []
      const remaining = Cards.filter(card => !usedCards.includes(card.display))
      return remaining[Math.floor(Math.random() * remaining.length)]
    },

    get user () {
      return user
    },

    set user (val) {
      user = val
    },

    get game () {
      return game
    },

    set game (val) {
      game = val
    },

    async createGame (wager) {
      // make sure we dont have any other games
      await this.quit()

      this.game = {
        username,
        wager: parseInt(wager),
        dealerCards: [this.getCard(), this.getCard()],
        userCards: [this.getCard(), this.getCard()]
      }

      this.calcTotals()
      this.game = await Game.create(game)
      return this
    },

    async findGame () {
      this.game = await Game.findOne({username})
      return this
    },

    async quit () {
      const games = await Game.find({username})
      this.game = null
      await Promise.all(games.map(row => Game.deleteOne(row)))
      return this
    },

    async subtrackLosses () {
      this.user.credits -= this.game.wager
      await User.updateOne({username: this.user.username}, {credits: this.user.credits})
    },

    async takeWinnings () {
      this.user.credits += this.game.wager
      await User.updateOne({username: this.user.username}, {credits: this.user.credits})
    },

    async hit () {
      this.game.userCards.push(this.getCard())
      this.calcTotals()

      const {userCards, userTotal } = this.game
      await Game.updateOne({_id: game._id}, {userCards, userTotal})

      if (this.userBusted) this.subtrackLosses()
      return this
    },

    async playDealer (amount) {
      this.game.wager += parseInt(amount)
      while (this.game.dealerTotal < this.game.userTotal) {
        this.game.dealerCards.push(this.getCard())
        this.calcTotals()
      }

      if (this.isWinning) await this.takeWinnings()
      else await this.subtrackLosses()
      return this
    }

  }
}
