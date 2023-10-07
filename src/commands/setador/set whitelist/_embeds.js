const [spotifyGreen, twitterBlue, softRed, sucessYellow, attentionPurple, off] = ['#1DB954', '#1DA1F2', '#de3f44', 'e6cc00', '#db23bc', '#2F3136']
const { EmbedBuilder } = require('discord.js')
const { corbot } = require("../../../config.json")

this.whitelist_start_embed = (serverName, interaction) => new EmbedBuilder()
.setAuthor({ name: '📋 Sistema de whitelist - ' + interaction.guild.name })
.setDescription('**Clique no botão** para fazer sua whitelist, após sua aprovação seu passaporte será liberado na cidade!\n\n• Você terá em média 1 minuto para responder cada questão.\n• Caso você reprova, terá que refazer.')
.setThumbnail(interaction.guild.iconURL({ dynamic: true }))
.setFooter({ text: interaction.guild.name +' © Todos os direitos reservados'})
.setColor(corbot)