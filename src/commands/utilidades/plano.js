const { SlashCommandBuilder } = require('discord.js')
const Discord = require('discord.js')
const { corbot } = require ("../../config.json")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('plano')
        .setDescription('Veja as informaçao de seu plano'),
    run: async (interaction, client, typo) => {

    let days = Math.floor((client.uptime / (1000 * 60 * 60 * 24)) % 60).toString();
    let hours = Math.floor((client.uptime / (1000 * 60 * 60)) % 60).toString();
    let minuts = Math.floor((client.uptime / (1000 * 60)) % 60).toString();
    let seconds = Math.floor((client.uptime / 1000) % 60).toString();

    let Embed = new Discord.EmbedBuilder()
        .setColor(corbot)
        .setTitle("**DURAÇÃO DO PLANO DO BOT**")
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
        .setDescription("**O SEU PLANO É LIFE TIME**")
        .setTimestamp()
        .addFields({ name: `Dias : `, value: `INFINITO` }) 
        .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL({ ephemeral: true }) })

    await interaction.reply({ embeds: [Embed], ephemeral: true })

}}