const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
const sql = require("sqlite");

const cd = new Set();
const cdsec =4

const config = require("../assets/config.json");
sql.open(`./assets/${config.dbsqlite}`);

module.exports = async (client, message) => {
    sql.get(`SELECT * FROM guildes WHERE guildId ="${message.guild.id}"`).then(row => {
        if (!row) {
            sql.run("INSERT INTO guildes (guildId, prefix) VALUES (?, ?)", [message.guild.id, "*"]);
          } 
        }).catch(() => {
        console.error;
        sql.run("CREATE TABLE IF NOT EXISTS guildes (guildId TEXT, prefix TEXT)").then(() => {
          sql.run("INSERT INTO guildes (guildId, prefix) VALUES (?, ?)", [message.guild.id, "*"]);
      })
    })

    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;
    sql.get(`SELECT * FROM guildes WHERE guildId ="${message.guild.id}"`).then(row => {
        if (!row) return;
            if (!message.guild.member(client.user).hasPermission('SEND_MESSAGES')) return;
            if (!message.guild.member(client.user).hasPermission('VIEW_CHANNEL')) return;
            
            const prefix = row.prefix
            if (row.prefix === undefined) return prefix = "*"
            if (message.content.indexOf(prefix) !== 0) return;

        //if(cd.has(message.author.id)){
        //    message.delete();
        //    return message.reply("Tu dois attendre 5 secondes entre chaque commandes").then(m => m.delete(2000))
        //}
        cd.add(message.author.id)
            const args = message.content.slice(prefix.length).trim().split(/ +/g);
            const command = args.shift().toLowerCase();
                console.log(`[${client.user.username}] [${message.guild.name}] [#${message.channel.name}] [${message.author.username}] ${row.prefix}${command} ${args}`);
                try {

                    let commandesfichiers = require(`../commands/${command}.js`);
                    commandesfichiers.run(client, message, args);
                    //setTimeout(() => {
                    //    cd.delete(message.author.id)
                    //}, cdsec * 1000)

                } catch (err) {
                        if (err instanceof Error && err.code === "NON_TROUVE") {
                            return;
                    } else
                        console.log(err)
                    }
          })
  
}
