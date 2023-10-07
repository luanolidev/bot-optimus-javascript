const [spotifyGreen, twitterBlue, softRed, sucessYellow, attentionPurple, off] = ['#1DB954', '#1DA1F2', '#de3f44', 'e6cc00', '#db23bc', '#2F3136']
const { EmbedBuilder } = require('discord.js')

this.aviso_embed = (title, desc, interaction) => new EmbedBuilder()
    .setColor('#335bcf')
    .setTimestamp()
    .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dinamyc: true }) })
    .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
    .setTitle(`${title}`)
    .setDescription(`${desc}`)
    .setFooter({ text: "Comunicado oficial da cidade", iconURL: interaction.guild.iconURL({ dynamic: true }) })