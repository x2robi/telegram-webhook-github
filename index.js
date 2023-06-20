const express = require("express");
const bodyParser = require("body-parser");
const Telegram = require("node-telegram-bot-api");

const { Port, ChatID, Token } = require("./config.js");

const app = express();
const bot = new Telegram(Token, { polling: true });

app.use(bodyParser.json());

app.post("/", async ({ body: data }, res) => {
    const sender = data.head_commit?.author?.username;
    const branch = data.ref?.replace("refs/heads/", "");
    const commit = data.head_commit?.message;
    const commit_url = data.head_commit?.url;
    const commits = data.commits?.length;
    
    await bot.sendMessage(ChatID, `💬 *${sender}* push ${branch}\n[${commit} (${commits} commits)](${commit_url})`, {
        parse_mode: "Markdown"
    });

    res.send("OK");
});

app.listen(Port, () => {
    console.log(`App running on port ${Port}`);
});