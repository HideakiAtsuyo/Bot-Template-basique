const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
const config = require("../assets/config.json");
sql.open(`./assets/${config.dbsqlite}`);
exports.run = async (client, message, args) => {
     

client.on('message', message => {
 
 sql.get(`SELECT * FROM guildes WHERE guildId ="${message.guild.id}"`).then(row => {
 	var prefix = row.prefix
 	const help = new Discord.RichEmbed()
        .setTitle("Aide")
        .addField("Ping du bot", `\`${prefix}prefix\`\nVous permettra de voir le ping du bot`)
        .addField("Changer le prefix", `\`${prefix}prefix <prefix>\`\nVous permettra de changer le prefix du bot`)
        .addField("Bannir un utilisateur", `\`${prefix}ban <@mention>\`\nVous permettra de bannir un utilisateur`)
        .addField("Etc...", "ou alors développez + votre commands handler")
        message.reply(help)
    })
})
}