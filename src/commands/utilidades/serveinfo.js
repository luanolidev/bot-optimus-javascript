const { SlashCommandBuilder } = require('discord.js')
const Discord = require("discord.js")
const { corbot } = require("../../config.json")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server-info')
        .setDescription('informa as informacoes do servido'),
    run: async (interaction, client, typo) => {

    let criacao_data = parseInt(interaction.guild.createdTimestamp / 1000)
    let server_icon = interaction.guild.iconURL({ dinamyc: true })
    if (server_icon) {

        interaction.reply({
            embeds: [
                new Discord.EmbedBuilder()
                    .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dinamyc: true }) })
                    .setTitle(`🏠 - Serverinfo`)
                    .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                    .setColor("#473bff")
                    .addFields(
                        { name: `🌾 - Level de verificação:`, value: `Level: **${interaction.guild.verificationLevel}**`, inline: true },
                        { name: `🌍 - Região:`, value: `${interaction.guild.region}`, inline: true },
                        { name: `📢 - Canal de AFK:`, value: `${interaction.guild.afkChannel}`, inline: true },
                        { name: `⛏ - Nível de filtro de conteúdo explícito:`, value: `Level: **${interaction.guild.explicitContentFilter}**`, inline: true },
                        { name: `📆 - Data de criação:`, value: `<t:${criacao_data}:R>`, inline: true },
                        { name: `👤 - Total de membros:`, value: `Total: **${interaction.guild.memberCount}**`, inline: true },
                        { name: `📌 - NFA Level:`, value: `Level: **${interaction.guild.mfaLevel}**`, inline: true },
                        { name: `💬 - Canais:`, value: `Total: **${interaction.guild.channels.cache.size}**`, inline: true },
                        { name: `🏷 - Cargos:`, value: `Total: **${interaction.guild.roles.cache.size}**`, inline: true },
                        { name: `😀 Emojis:`, value: `Total: **${interaction.guild.emojis.cache.size}**`, inline: true },
                        { name: `👑 - Owner`, value: `<@!${interaction.guild.ownerId}>`, inline: true },
                    )
            ],
            components: [
                new Discord.ActionRowBuilder()
                    .addComponents(
                        new Discord.ButtonBuilder()
                            .setStyle(5)
                            .setLabel(`Baixar Icone de ${interaction.guild.name}`)
                            .setURL(server_icon),
                    )
            ],
        })
    } else {
        interaction.reply({
            embeds: [
                new Discord.EmbedBuilder()
                    .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dinamyc: true }) })
                    .setTitle(`🏠 - Serverinfo`)
                    .setColor("White")
                    .addFields(
                        { name: `🌾 - Level de verificação:`, value: `Level: **${interaction.guild.verificationLevel}**`, inline: true },
                        { name: `🌍 - Região:`, value: `${interaction.guild.region}`, inline: true },
                        { name: `📢 - Canal de AFK:`, value: `${interaction.guild.afkChannel}`, inline: true },
                        { name: `⛏ - Nível de filtro de conteúdo explícito:`, value: `Level: **${interaction.guild.explicitContentFilter}**`, inline: true },
                        { name: `📆 - Data de criação:`, value: `<t:${criacao_data}:R>`, inline: true },
                        { name: `👤 - Total de membros:`, value: `Total: **${interaction.guild.memberCount}**`, inline: true },
                        { name: `📌 - NFA Level:`, value: `Level: **${interaction.guild.mfaLevel}**`, inline: true },
                        { name: `💬 - Canais:`, value: `Total: **${interaction.guild.channels.cache.size}**`, inline: true },
                        { name: `🏷 - Cargos:`, value: `Total: **${interaction.guild.roles.cache.size}**`, inline: true },
                        { name: `😀 Emojis:`, value: `Total: **${interaction.guild.emojis.cache.size}**`, inline: true },
                        { name: `👑 - Owner`, value: `<@!${interaction.guild.ownerId}>`, inline: true },
                    )
            ],
            components: [
                new Discord.ActionRowBuilder()
                    .addComponents(
                        new Discord.ButtonBuilder()
                            .setStyle(5)
                            .setLabel(`${interaction.guild.name} Não possui um icone.`)
                            .setURL('https://discord.com/app')
                            .setDisabled(true)
                    )
            ],
        })
    }
}}