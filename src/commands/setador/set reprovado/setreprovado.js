const { SlashCommandBuilder, ChannelType } = require('discord.js')
const { Guild } = require('../../../database/schemas')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('set-canal-reprovado')
        .setDescription('seleciona o canal de reprovados na whitelist')
        .addChannelOption(option =>
            option.setName('canal')
                .setDescription('Escolha o canal para as logs de reprovados')
                .addChannelTypes(ChannelType.GuildText)
                .setRequired(true)
        ),
    run: async (interaction, client, typo) => {

    const channel = interaction.options.getChannel('canal')
    const guildData = await Guild.findOne({ id: interaction.guild.id }) || new Guild({ id: interaction.guild.id })

    guildData.reprovedChannel = channel.id
    guildData.save()
    interaction.reply({ content: `Canal ${channel} - definido com sucesso.`, ephemeral:true })

}}