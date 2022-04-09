const Level = {
  names: ["level"],
  func: ({chat, userData})=>{
    chat.reply(`You are level ${userData.value.level.toFixed(2)}`)
  },
  description: "Checks your level"
};

export {Level};