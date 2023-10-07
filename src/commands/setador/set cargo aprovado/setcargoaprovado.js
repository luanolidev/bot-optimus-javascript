const { SlashCommandBuilder, ChannelType } = require('discord.js')
const { Guild } = require('../../../database/schemas')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('set-cargo-aprovado')
        .setDescription('seleciona o cargo de aprovado e o cargo')
        .addRoleOption(option =>
            option.setName('cargo')
                .setDescription('Escolha o cargo do aprovado')
                .setRequired(true)
        ),
    run: async (interaction, client, typo) => {

    const channel = interaction.options.getRole('cargo')

    const guildData = await Guild.findOne({ id: interaction.guild.id }) || new Guild({ id: interaction.guild.id })

    guildData.approvedRole = channel.id
    guildData.save()
    interaction.reply({ content: `Cargo ${channel} definido com sucesso.`, ephemeral:true })
}}