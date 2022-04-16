import {getUserDataManager} from "../../database.js"

const Buy = {
  names: ["buy"],
  func: async ({chat, client, args: [body, item], userData})=>{
    if (body) {
      if (item) {
        if (body == "b!" || "BurgerBot") {
          if (item.toLowerCase() == "workers" || "money" || "customers") {
            if (userData.value.money >= 10) {
              const post = await client.groups["62535105a95b113f103c2d57"].post("@BurgerBot");
              setTimeout(async function( ) {
                const something = await post.chat(`b!buy ${chat.author.id} ${item}`)
                chat.reply(`You bought some ${item}!`)
              }, 5000)
              userData.value.money -= 10
              setTimeout(function( ) {
                userData.update()
              }, 2500)
            } else {
              chat.reply(`You dont have enough money to buy that item... (needed: $10)`)
            }
          } else {
            chat.reply("Please pick the item you want to buy $buy <bot name/prefix> <item>")
          }
        }
      }
    } else {
      chat.reply("Please pick the bot you want to buy an item for | $buy <bot name/prefix> <item>")
    }
  },
  description: "Buy stuff for other bots"
};

const Bot = {
  names: ["bot"],
  func: async ({chat, body})=>{
    if (body) {
      var data = await getUserDataManager(body)

      chat.reply("All done")
      data.value.money += 0.05
      setTimeout(function( ) {
        data.update()
        chat.post.disconnect()
      }, 2500)
    }
  },
  description: "nothing",
  permission: "Bot"
};

export {Buy, Bot};