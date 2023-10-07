const { SlashCommandBuilder, ChannelType } = require('discord.js')
const { Guild } = require('../../../database/schemas')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('set-canal-aprovado')
        .setDescription('seleciona o canal de aprovado e o cargo respectivo')
        .addChannelOption(option =>
            option.setName('canal')
                .setDescription('Escolha o das logs de aprovado')
                .addChannelTypes(ChannelType.GuildText)
                .setRequired(true)
        ),
    run: async (interaction, client, typo) => {

    const channel = interaction.options.getChannel('canal')    
    const guildData = await Guild.findOne({ id: interaction.guild.id }) || new Guild({ id: interaction.guild.id })

    guildData.approvedChannel = channel.id
    guildData.save()
    interaction.reply({ content: `Canal ${channel} definido com sucesso.`, ephemeral:true })
}}