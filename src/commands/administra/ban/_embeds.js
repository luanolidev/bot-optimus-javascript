const [spotifyGreen, twitterBlue, softRed, sucessYellow, attentionPurple, off] = ['#1DB954', '#1DA1F2', '#de3f44', 'e6cc00', '#db23bc', '#2F3136']
const { EmbedBuilder } = require('discord.js')

this.sucess_ban = (user) => new EmbedBuilder()
    .setColor("#7200ff")
    .setDescription(`O usuário ${user} (\`${user.id}\`) foi banido com sucesso!`);

this.error_ban = (user) => new EmbedBuilder()
    .setColor("Red")
    .setDescription(`Não foi possível banir o usuário ${user} (\`${user.id}\`) do servidor!`);
