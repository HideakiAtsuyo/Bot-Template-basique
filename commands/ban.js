const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
const config = require("../assets/config.json");
sql.open(`./assets/${config.dbsqlite}`);
exports.run = (client, message, args) => {

  sql.get(`SELECT * FROM guildes WHERE guildId ="${message.guild.id}"`).then(row => {
  const prefix = row.prefix
  let y = `Vous devez utiliser la commande comme ceci: \`${prefix}ban <@mention>\``  
  if (message.member.hasPermission("BAN_MEMBERS")) {
  if (!message.guild.member(client.user).hasPermission('BAN_MEMBERS')) return message.reply('Désolé, je n\'ai pas la permission dont j\'ai besoin: **BAN_MEMBERS**. :x:')
  if (message.mentions.users.size < 1) return message.reply(y)
  let user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args.slice(0).join(" "));
  if (user.id === message.author.id) return message.reply(`Vous êtes schizophrène pour vouloir vous bannir vous même?`);
  if (user.id === client.user.id) return message.reply(`Pourquoi voulez-vous que je m'auto-banisse? Cela est impossile!`);
  if (user.highestRole.position >= message.member.highestRole.position) return message.reply('Je ne peux pas bannir cet utilisateur. Il est au même niveau que vous ou à un niveau supérieur. :x:');
  let raison = `(${message.author.tag}): ${args.slice(1).join(' ')}` || `(${message.author.tag}) n'a pas donne de raison.`;
  if (!message.guild.member(user).bannable) return message.reply(' Je ne peux pas bannir cet utilisateur. C\'est peut-être parce qu\'il est au-dessus de moi :x:');
  message.guild.ban(user, raison);
  message.channel.send("***L'utilisateur a été banni avec succès! :white_check_mark:***")
  }
})
}
