const { SlashCommandBuilder } = require('discord.js')
const Discord = require('discord.js')

    module.exports = {
        data: new SlashCommandBuilder()
            .setName('lock')
            .setDescription('Trava um canal de texto.'),
    
        run: async (interaction, client, typo) => {

if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageChannels)) {
    interaction.reply(`${interaction.user}, Você precisa ter a permissão ADMINISTRATOR para executar este comando!`)
} else {

    interaction.reply(`✅ Este chat foi trancado com sucesso.`).then(msg => {
        interaction.channel.permissionOverwrites.edit(interaction.guild.id, { SendMessages: false }).catch(e => {
            console.log(e)
            interaction.edit(`❌ Ops, algo deu errado ao tentar trancar este chat.`)
            
        })
    })
}}}