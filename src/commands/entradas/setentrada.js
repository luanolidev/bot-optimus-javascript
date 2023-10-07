const { SlashCommandBuilder } = require('discord.js')
const { Guild } = require('../../database/schemas')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('set-canal-entrada')
    .setDescription('Setar o canal de entrada')
    .addChannelOption(option =>
        option.setName('canal')
            .setDescription('Definir o canal para a mensagem de entra para usuários que entrarem do servidor')
            .setRequired(true)
    ),
    run: async (interaction, client, typo) => {

    if (!interaction.member.permissions.has("ManageGuild")) return interaction.reply({ content: `:x: | ${interaction.user} - Voce nao tem permissão para usar esse comando` })

    const canal = interaction.options.getChannel('canal') || interaction.channel
    const guildData = await Guild.findOne({ id: interaction.guild.id }) || new Guild({ id: interaction.guild.id })
    
    guildData.joinChannel = canal.id || interaction.channel.id
    await guildData.save()

    interaction.reply({ content: `|${interaction.user} - canal de entrada definido para ${canal} com sucesso.`, ephemeral:true })
}}