import db from "quick.db";
import {DATABASE_PREFIX} from "./constants.js";

/*
ranks: 
1. Owner (2)
2. Normal (1)
3. Banned (0)
*/

const specialRanks = {
  "6154f0d0a8d6d106c5b869b6": "Owner",

  "6244e8a4a95b113f10314747": "Bot"
}

export const defaultData = {
  money: 0,
  level: 0,
  rank: "Normal",
  
  BannedTime: 0
};

export async function getDataForUserId(userid) {
  let result;
  try {
    result = JSON.parse(await db.get(`${DATABASE_PREFIX}${userid}`))
    if (!result) {
      result = {};
    }
  } catch (e) {
    result = {};
  }
  if (specialRanks[userid]) {
    result.rank = specialRanks[userid];
  }
  return {...defaultData, ...result};
}

const userDataPromises = {};
class UserDataManager {
  saveTimeout = setTimeout(()=>{
    this.save();
  }, 2_000)

  async pull(){
    this.value = await getDataForUserId(this.userid);
  }
  applyRanks(){
    if (specialRanks[this.userid]) {
        result.rank = specialRanks[this.userid];
    }
  }
  async save(){
    await saveDataForUserId(this.userid, this.value);
  }
  update(){
    this.saveTimeout.refresh();
  }
  constructor(id, value){
    this.userid = id;
    this.value = value;
  }
}

export async function getUserDataManager(userid){
  if (!userDataPromises[userid]) {
    userDataPromises[userid] = new Promise(async (res, rej)=>{
      const data = await getDataForUserId(userid);
      const obj = new UserDataManager(userid, data);
      res(obj);
    })
  }
  return userDataPromises[userid];
}

export async function saveDataForUserId(userid, data) {
  if (!data) throw new Error("Argument 2 'data' not specified.");
  const serialized = JSON.stringify(data);
  await db.set(`${DATABASE_PREFIX}${userid}`, serialized);
}