require('dotenv').config();
let bk = require('botkit');

let controller = bk.slackbot({
    clientId: process.env.clientId,
    clientSecret: process.env.clientSecret,
    scopes: ['bot'],
    retry: Infinity
})

controller.spawn({
    token: process.env.token
}).startRTM((err, bot, payload) => {
    if(err) throw new Error(err)
    console.log('Connected to Slack RTM!')
});

controller.on('create_user', (bot, message) => {
    bot.replyPrivate(message, `Hello <@${message.user}> welcome to the Ryerson Computer Science Slack!`)
    bot.replyPublic(message, `<@${message.user}> joined for the first time`)
})

controller.hears('help', 'direct_message', (bot, message) => {
    bot.reply(message, "No commands supported yet... ")
})