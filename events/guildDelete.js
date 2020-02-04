const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
const config = require("../assets/config.json");
sql.open(`./assets/${config.dbsqlite}`);
module.exports = (client, guild, message) => {
  sql.run(`DELETE FROM guildes WHERE guildId = ${guild.id}`)
};