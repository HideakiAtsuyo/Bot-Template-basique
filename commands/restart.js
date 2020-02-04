const Discord = require("discord.js");
const config = require("../assets/config.json");
exports.run = async (client, message, args) => {
     if(message.author.id == config.owner){}else{return;}
     return client.destroy() && client.login(config.token)
}
