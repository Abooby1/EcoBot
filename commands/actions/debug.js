import { getUserDataManager } from "../../database.js";

const TempBan = {
  names: ["ban"],
  func: async ({chat, args: [userid, time]})=>{
    if (userid != "" && time != ""/* && userid != "6154f0d0a8d6d106c5b869b6"*/) {
    var data = await getUserDataManager(userid)
    var NormalRank = data.value.rank
    data.value.rank = "Banned"
    setTimeout(function( ) {
      data.value.rank = NormalRank
      setTimeout(function() {
        data.update();
      }, 1500)
    }, time * 60000)
    setTimeout(function() {
      data.update();
      chat.reply(`I have temp banned ${userid} | Time: ${time * 60} seconds`)
    }, 1500)
    } else {
      chat.reply("There has been an error, please check the chat...")
      console.log(`${chat.author.username} had an error banning someone...`)
    }
  },
  description: "Temp bans someone",
  hidden: true,
  permission: "Owner"
};

const Test = {
  names: ["test"],
  func: ({chat})=>{
    chat.reply("Test completed")
  },
  description: "test",
  permission: "Owner",
  hidden: true
};

export {Test, TempBan}