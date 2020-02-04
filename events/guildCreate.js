const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
const config = require("../assets/config.json");
sql.open(`./assets/${config.dbsqlite}`);
module.exports = (client, guild, message) => {
    sql.get(`SELECT * FROM guildes WHERE guildId ="${guild.id}"`).then(row => {
        if (!row) {
            sql.run("INSERT INTO guildes (guildId, prefix) VALUES (?, ?)", [guild.id, "*"]);
          } 
        }).catch(() => {
        console.error;
        sql.run("CREATE TABLE IF NOT EXISTS guildes (guildId TEXT, prefix TEXT)").then(() => {
          sql.run("INSERT INTO guildes (guildId, prefix) VALUES (?, ?)", [guild.id, "*"]);
      })
    })
};