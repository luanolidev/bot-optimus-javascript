const { SlashCommandBuilder } = require('discord.js')
const Discord = require('discord.js')

const code = (interaction, client) => {
    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageChannels)) {
        interaction.reply({ content: `${interaction.user}, Você precisa ter a permissão ADMINISTRATOR para executar este comando!`})
    } else {

        let embed = new Discord.EmbedBuilder()
            .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dinamyc: true }) })
            .setTitle("Canal Destrancado🔓")
            .setColor('#473bff')
            .setDescription(`Este chat foi destrancado com sucesso por: ${interaction.user} `)

        interaction.reply({ embeds: [embed] }).then(msg => {
        interaction.channel.permissionOverwrites.edit(interaction.guild.id, { SEND_MESSAGES: true }).catch(o => {
                console.log(o)
                interaction.reply({ content: `❌ Ops, algo deu errado ao tentar destrancar este chat.`})
            })
        })

            }
}

module.exports = {
    data: new SlashCommandBuilder()
    .setName('unlock')
    .setDescription('Destrancar um canal'),
    
    run: async (interaction, client, typo) => {

    code(interaction,client)
    },
    execute: async (message, client, input1, typo) => {

    code(message,client)
    }
}