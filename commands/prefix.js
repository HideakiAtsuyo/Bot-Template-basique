const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
const config = require("../assets/config.json");
sql.open(`./assets/${config.dbsqlite}`);
exports.run = (client, message, args) => {

     if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("Tu n'a pas la permission: __**MANAGE_GUILD**__");
     const nouveauprefix = args[0]
     const nprefixfix = nouveauprefix.replace(/[^\x00-\x7F]/g, "");
     if (nouveauprefix.length < 1) return message.reply("Tu n'as pas fourni de nouveau préfixe à définir")
     if (nprefixfix.length < 1) return message.channel.send("Le préfixe ne peut pas contenir de caractères ascii")
     if (nouveauprefix.length > 7) return message.channel.send("le préfixe ne peut pas dépasser 7 caractères")
     sql.get(`SELECT * FROM guildes WHERE guildId ="${message.guild.id}"`).then(row => {
     sql.run(`UPDATE guildes SET prefix = "${nprefixfix}" WHERE guildId = ${message.guild.id}`);
     message.reply("J'ai définis le nouveau prefix de guilde à " + "`" + `${nouveauprefix}` + "`")
    })
}
