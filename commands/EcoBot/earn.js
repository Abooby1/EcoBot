const Earn = {
  names: ["earn"],
  func: ({chat, body, userData})=>{
    if (body) {
      chat.reply("Earning has started")
      var Times = 0
      var Earned = 0
      var EarnSet = setInterval(function( ) {
        if (Times != body) {
          Times = Times + 1
          if (userData.value.level >= 2.5) {
            Earned = userData.value.level * 0.006
          } else {
            Earned = 0.02
          }
          userData.value.money += Earned
          setTimeout(function( ) {
            userData.update()
          }, 2500)
          chat.reply(`You earned $${Earned}`)
        } else {
          clearInterval(EarnSet)
          chat.reply(`You have earned ${body} times!`)
        }
      }, 10000)
    } else {
      chat.reply("You need the times you want to earn...")
    }
  },
  description: "Earn money to buy items (for other bots or exclusive items for Abicam Studios games)",
  permission: rank => rank != "Banned"
};

export {Earn};