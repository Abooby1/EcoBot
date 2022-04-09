import {Actions} from "./actions/index.js"
import {EcoBot} from "./EcoBot/index.js"

export const Commands = [
  ...Actions,
  ...EcoBot
];