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
    const sender = data.head_commit.author.username;
    const branch = data.ref.replace("refs/heads/", "");
    const commit = data.head_commit.message;
    const commit_url = data.head_commit.url;
    const commits = data.commits.length;

    bot.sendMessage(chatId, `💬 *${sender}* push ${branch}\n[${commit} (${commits} commits)](${commit_url})`, {
        parse_mode: 'Markdown'
    })

    res.send("OK")
});

app.listen(80, function () {
    console.log("app running");
})
