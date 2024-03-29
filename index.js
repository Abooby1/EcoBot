import { Client } from "photop-client";
import { onChat } from "./commands_entry.js";
import { START, PREFIX } from "./constants.js";

const client = new Client({ username: "EcoBot", password: process.env['Pass'] }, { logSocketMessages: false });

const noop = () => { };

client.onPost = async (post) => {  
  const resetTimeout = await post.connect(60000, () => {
    post.onChat = noop; //replace post.onChat to free up memory
    if (post.text.match("$connect")) {
      post.chat("Bot has disconnected... Reason: inactivity")
    }
  })

  if (post.text.match(START)) {
    setTimeout(function( ) {
      resetTimeout()
      post.chat(`Im now connected to ${post.author.username}'s post!`)
    }, 2000)
  }

  post.onChat = (chat) => {
    resetTimeout();
    onChat(client, chat);
  }
  }

client.onReady = () => {
  console.log("EcoBot is ready!")
}

import express from "express"
const app = express();

app.get('/', (req, res) => res.send("Running!"))
app.listen(3000);
