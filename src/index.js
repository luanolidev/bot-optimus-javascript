const { Client, IntentsBitField, Collection } = require("discord.js");
const { token, MONGO_URI, prefix } = require("./config.json");
const mongoose = require("mongoose");
const { readdirSync } = require("fs");
const { loadEvents, loadAssets } = require('./configs/utils/botLoad')

const myIntents = new IntentsBitField();
myIntents.add(
  "Guilds",
  "GuildMessages",
  "GuildMessageReactions",
  "MessageContent",
  "GuildMembers"
);
const client = new Client({ intents: myIntents });


client.prefix = prefix;
client.commands = new Collection();
client.userTemp = new Collection();

//commands loader
const commandFiles = [];
(findCommands = async (path = "commands") => {
  readdirSync(`./src/${path}`).filter(async (file) => {
    if (file === "aliases" || file.startsWith('_')) return;
    if (file.endsWith(".js")) return commandFiles.push(file);
    findCommands(path + `/${file}`);
  });
})();

for (const file of commandFiles) {
  let commander;
  const getCommands = (name, path = "commands") => {
    const dirr = `./src/${path}`;

    readdirSync(dirr).filter((find) => {
      if (find === name) {
        commander = `./${path}/${find}`;
      } else {
        if (find.endsWith("js") === true) return;
        if (find === "aliases" || find.startsWith("_")) return;
        return getCommands(name, path + `/${find}`);
      }
    });
  };
  getCommands(file);

  const command = require(commander);

  client.commands.set(
    command.data.name, command
  );
}


//normal events loader
const eventFiles = readdirSync("./src/events")
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);

  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {

    client.on(event.name, (data) => {
      
      if (data.type === 2) return event.execute(data, client, "slash");

      if (data.type === 0) return event.execute(data, client, "message");

      event.execute(data, client)
    });
  }
}

client.login(token)
  .then(async () => {
    const { name } = require('../package.json')
    const top = `\x1b[34m┏╋◆ ${name.toUpperCase()} ◆╋┓\n\n\x1b[31m┏╋━━━━━━◥◣◆◢◤━━━━━━━╋┓\n┗╋━━━━━━◢◤◆◥◣━━━━━━━╋┛`
    const bottom = `\x1b[31m┏╋━━━━━━◥◣◆◢◤━━━━━━━╋┓\n┗╋━━━━━━◢◤◆◥◣━━━━━━━╋┛\n\n\x1b[34m┏╋◆ ${name.toUpperCase()} ◆╋┓\n\n`
    console.log('\n' + top + "\n\n\x1b[32m[!] Bot Status: ONLINE")

    module.exports = {
      client: client
    }
    loadAssets()
    loadEvents(client)

    const { ipdb, userdb, senhadb, basedb, portdb } = require('./config.json')

    const connect = require('./db_connect')

    await connect.login(ipdb, userdb, senhadb, basedb, portdb)

    await mongoose.connect(MONGO_URI || "", { keepAlive: true })
      .then(res => console.log("\x1b[32m[!] MongoDB DataBase status: ONLINE\n\n" + bottom))
      .catch(err => console.log("\x1b[31mDataBase login err: " + err))
  })
  .catch(err => { console.log("\x1b[31mBot login err: " + err); console.log(err) })


const { QuickDB } = require("quick.db")
const db = new QuickDB(); // npm i quick.db better-sqlite3

///Sistema de anti invites

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  let confirm = await db.get(`antilink_${message.guild.id}`);
  if (confirm === false || confirm === null) {
    return;
  } else if (confirm === true) {
    if (message.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) return; // Caso o usuário tenha permissão de ADM, o bot vai permitir que o mesmo envie links
    if (message.content.toLocaleLowerCase().includes("http")) {
      message.delete()
      message.channel.send(`${message.author} Não envie links no servidor!`)
    }

  }
})

///////ANTI-ERROR

process.on('unhandRejection', (reason, promise) => {
  console.log(`Novo erro encontrado ⚠️\n\n` + reason, promise);
});
process.on('uncaughtException', (error, origin) => {
  console.log(`Novo erro encontrado ⚠️\n\n` + error, origin);
});
process.on('uncaughtExceptionMonitor', (error, origin) => {
  console.log(`Novo erro encontrado ⚠️\n\n` + error, origin);
});