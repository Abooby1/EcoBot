import { defaultData, getUserDataManager } from "../../database.js";

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

const SetMoney = {
  names: ["setmoney"],
  func: async ({ chat, args: [userid, money] }) => {
    if (userid === "@me") {
      userid = chat.user.id;
    }
    const data = await getUserDataManager(userid);
    data.value.money = parseFloat(money) || 0;
    data.update();
    chat.reply(`I set ${userid}'s money to ${data.value.money}`)
  },
  hidden: true,
  permission: "Owner",
  description: "Sets your money."
};

const ResetData = {
  names: ["resetdata"],
  func: async ({ chat, args: [userid] }) => {
    if (userid == "6154f0d0a8d6d106c5b869b6") return;
    if (userid === "@me") {
      userid = chat.user.id;
    }
    const data = await getUserDataManager(userid);

    // deep clone defaultData
    data.value = JSON.parse(JSON.stringify(defaultData));
    data.applyRanks();

    setTimeout(function() {
      data.update();
      chat.reply("I reset their data!")
    }, 1500)
  },
  hidden: true,
  description: "Resets a specific substat of a user to its default value. Note: Ranks are hard coded and cannot be reset.",
  permission: "Owner",
}

const Test = {
  names: ["test"],
  func: ({chat})=>{
    chat.reply("Test completed")
  },
  description: "test",
  permission: "Owner",
  hidden: true
};

export {Test, TempBan, SetMoney, ResetData}