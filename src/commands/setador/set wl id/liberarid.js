const { SlashCommandBuilder, ChannelType } = require('discord.js')
const { Guild, User} = require('../../../database/schemas')
const { whitelist_start_button } = require('./_buttons')
const { whitelist_liberar_embed } = require('./_embeds')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('set-liberar-id')
        .setDescription('Escolha o canal para enviar o botão para liberação de ids')
        .addChannelOption(option =>
            option.setName('canal')
                .setDescription('Escolha o canal de registro da whitelist')
                .addChannelTypes(ChannelType.GuildText)
                .setRequired(true)
        )
        .addChannelOption(option => 
            option.setName('categoria')
                .setDescription('Escolha a categoria que irão ficar os canais temporarios')
                .addChannelTypes(ChannelType.GuildCategory)
                .setRequired(true)
        ),
    run: async (interaction, client, typo) => {

    const guildData = await Guild.findOne({ id: interaction.guild.id }) || new Guild({ id: interaction.guild.id })

    const channel = interaction.options.getChannel('canal')
    const category = interaction.options.getChannel('categoria')

    await channel.send({
        components: [whitelist_start_button()],
        embeds: [whitelist_liberar_embed(interaction.guild.name, interaction)]
    })

    guildData.whitelistCategory = category.id
    await guildData.save()

    await interaction.reply({
        content: `Canal configurado com sucesso ${channel}`, ephemeral: true
    })


}}
