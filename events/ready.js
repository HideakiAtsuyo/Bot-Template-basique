const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
const fs = require("fs");
const chalk = require("chalk");
const config = require("../assets/config.json");
module.exports = (client, guild, files, message) => {
var now = new Date();
var heures = now.getHours();
var minutes = now.getMinutes();
var secondes = now.getSeconds();
var times = (chalk.red(`[`) + chalk.blue(`${heures}:${minutes}:${secondes}`) + chalk.red(`]/`));

        fs.readdir("./commands/", async (err, files) => {
          const filez = files.length
       if (err) return console.error(err);
            console.log(`${filez} commandes chargées!`)
        })
        console.log(times + `\x1b[36m%s\x1b[0m`, '[INFO]', '\x1b[0m' + chalk.red("Connecté sur ") + chalk.blue(client.user.username) + chalk.red("#") + chalk.blue(client.user.discriminator) + chalk.red(" - (") + chalk.blue(client.user.id) + chalk.red(")"));
        console.log(times + chalk.red("Nombre de guildes: ") + chalk.blue(client.guilds.size));
        /*
        client.guilds.map(r =>{
          console.log(chalk.red("Nom: ") + chalk.blue(r.name) + ` | ` + chalk.red(`Membres: `) + chalk.blue(`${r.memberCount}`) + ` | ` + chalk.red(`ID: `) + chalk.blue(`${r.id}`))
        })
        */
        
    client.setInterval(() => {
        var activites = [
          {
            "text": "LES UTILISATEURS",
            "type": "WATCHING"
          },
          {
            "text": "SURVERILLER LES SERVEURS",
            "type": "PLAYING"
          },
          {
            "text": "L'OWNER: Hideaki#9897",
            "type": "WATCHING"
          },
          {
            "text": "PREFIX BASE: *",
            "type": "WATCHING"
          },
          
          
          
        ]
        const activite = activites[Math.floor(Math.random() * activites.length)];
        client.user.setactivite(activite.text, { type: activite.type });
        
    }, 3600000);
}
