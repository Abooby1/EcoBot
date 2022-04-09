const Money = {
  names: ["money"],
  func: ({chat, userData})=>{
    chat.reply(`You have $${userData.value.money.toFixed(2)}`)
  },
  description: "Check your money"
};

export {Money};