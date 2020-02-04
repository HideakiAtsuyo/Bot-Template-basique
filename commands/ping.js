const Discord = require("discord.js");
const config = require("../assets/config.json");
exports.run = async (client, message, args) => {
message.channel.send("Ping en cours...").then(m => {
        let ping = m.createdTimestamp - message.createdTimestamp
        
        const embed = new Discord.RichEmbed()
        .setTitle(':ping_pong: LATENCE :ping_pong:')
        .setDescription((`**Ping:** \`${ping}ms\`\n**Ping API:** \`${Math.round(client.ping)}ms\``))
        .setColor("RANDOM")
        .setFooter(client.user.username, client.user.displayAvatarURL)
        .setTimestamp()
        return m.edit(embed)
})}