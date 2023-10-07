const [spotifyGreen, twitterBlue, softRed, sucessYellow, attentionPurple, off] = ['#1DB954', '#1DA1F2', '#de3f44', 'e6cc00', '#db23bc', '#2F3136']
const { EmbedBuilder } = require('discord.js')
const { corbot, imagemticket } = require("../../../config.json") 



this.ticket_menu_embed = interaction => new EmbedBuilder()
    .setColor(corbot)
    .setTitle(`SISTEMA DE ATENIDIMENTO VIA TICKET`)
    .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
    .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
    .setDescription(`Escolha abraixo que tipo de ticket que voce precisa no menu abaixo.`)
    .setImage(imagemticket)