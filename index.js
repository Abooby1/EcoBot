const { Client } = require("photop-client")
const mySecret = process.env['Pass'];

const Database = require("@replit/database")
const db = new Database()

const client = new Client({ username: "EcoBot", password: mySecret }, { logSocketMessages: false });

var Prefix = "$"
var ADBreak = 0

var ADS = [
  "Check out patreon.com/abicambot",
  "Follow @Abooby"
]

const noop = () => { };

/*
UID (Abooby): 6154f0d0a8d6d106c5b869b6
*/

//db.list().then(keys => { console.log(keys) });

client.onPost = (post) => {
  if (post.text.match("gn") || post.text.match("Gn")) {
    post.chat("gn!")
  }
  if (post.text.startsWith(Prefix + "earn")) {
    post.connect()
    db.get(post.author.id + "Money").then(money => {
      db.get(post.author.id + "Level").then(level => {
        ADBreak += 1
        var Amount = 0
        var Earn = setInterval(function() {
          post.chat(`You earned $0.02 and 0.01 levels!`)
          level = level + 0.01
          money = money + 0.02
          Amount += 1
          if (Amount >= 10) {
            post.chat("Max earning has been reached...")
            clearInterval(Earn)
            post.onChat = noop
            post.chat("I have disconnected...")
          }
          db.set(post.author.id + "Money", money).then(() => {
            db.set(post.author.id + "Level", level).then(() => {

            })
          })
        }, 10000)
      })
    })
  } else {
    setTimeout(function() {
      if (post.text.match(/[a-zA-Z0-9]/)) {
        post.connect(300000, () => {
          post.onChat = noop
        })
        db.get(post.author.id + "Money").then(money => {
          db.get(post.author.id + "Level").then(level => {
            money = money + 0.05
            level = level + 0.01
            db.set(post.author.id + "Money", money).then(() => { })
            db.set(post.author.id + "Level", level).then(() => { })
          })
        })
      }
    }, 1000)
  }

  post.onChat = (chat) => {
    //ads
    setInterval(function() {
      if (ADBreak >= 5) {
        ADBreak = 0
        post.chat("AD: " + ADS[Math.floor(Math.random() * ADS.length)])
      }
    }, 1000)
    //normal
    if (chat.text.match(/[a-zA-Z0-9]/)) {
      db.get(chat.author.id + "Money").then(money => {
        db.get(chat.author.id + "Level").then(level => {
          money = money + 0.01
          level = level + 0.02
          db.set(chat.author.id + "Money", money).then(() => {
            db.set(chat.author.id + "Level", level).then(() => {

            })
          })
        })
      })
    }
    if (chat.text.startsWith(Prefix + "money")) {
      setTimeout(function() {
        db.get(chat.author.id + "Money").then(money => {
          post.chat(`You have $${money.toFixed(2)}`)
          ADBreak += 1
        })
      }, 500)
    }
    if (chat.text.startsWith(Prefix + "level")) {
      setTimeout(function() {
        db.get(chat.author.id + "Level").then(level => {
          post.chat(`You are currently level ${level.toFixed(2)}`)
          ADBreak += 1
        })
      }, 500)
    }

  }
}

require('./server')();