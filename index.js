const Discord = require("discord.js")
const chalk = require("chalk")
const client = new Discord.Client({disableEveryone: true});
////////////////////////////////////////////////
//Juste pour éviter l'avertissement de base concernant les listeners
client.setMaxListeners(Number.POSITIVE_INFINITY)
////////////////////////////////////////////////
let config = require('./assets/config.json');
const sql = require("sqlite");
sql.open(`./assets/${config.dbsqlite}`);


//////////////////////////////////////////////////////////////////////////////////////////////////


const fs = require("fs")

client.commands = new Discord.Collection();
fs.readdir('./events/', (err, files) => {
  files = files.filter(f => f.endsWith('.js'));
  files.forEach(f => {
      const event = require(`./events/${f}`);
      client.on(f.split('.')[0], event.bind(null, client));
      delete require.cache[require.resolve(`./events/${f}`)];
  });
});


//////////////////////////////////////////////////////////////////////////////////////////////////



client.login(config.token);