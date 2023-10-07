const { SlashCommandBuilder } = require('discord.js')
const Discord = require('discord.js')
const { corbot } = require ("../../config.json")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ajuda')
        .setDescription('Veja as informaçao de seu plano'),
    run: async (interaction, client, typo) => {

    let Embed = new Discord.EmbedBuilder()
        .setColor(corbot)
        .setTitle("**MEUS COMANDOS**")
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
        .setDescription("<a:1003004115187675366:1080586395007058001> Comandos de **utilidade** abaixo: ```/ajuda /avaliar /sugerir /pedirset /plano```\nComandos de **diversão** abaixo:```/avatar /banner /serverinfo /sugerir /pedirset```\nComandos de **administração** abaixo: ```/addvip /antilink /aviso /ban /unban /clear /dm /lock /unlock /modolento /say /sorteio```\nComandos de Setagem abaixo: ```/setwhitelist /setaprovado /setreprovado /setcargoaprovado /setdatabase /setticket /setstatus /setentrada /setsaida /setautorole```\n")
        .setTimestamp()
        .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL({ ephemeral: true }) })

    await interaction.reply({ embeds: [Embed], ephemeral: true })

}}