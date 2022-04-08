const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const telegram = require("node-telegram-bot-api");
const bot = new telegram("token", {
    polling: true
});

const chatId = 0;

app.use(bodyParser.json());

app.post("/", async (req, res) => {
    const data = req.body;
    const sender = data.pusher.username;
    const branch = data.repository.master_branch;
    const commit = data.head_commit.message;
    const commit_url = data.head_commit.url;
    const commits = data.commits.length;

    bot.sendMessage(chatId, `💬 *${username}* push ${branch}\n[${commit} (${commits} commits)](${commit_url})`, {
        parse_mode: 'Markdown'
    })

    res.send("OK")
});

app.listen(80, function () {
    console.log("app running");
})
