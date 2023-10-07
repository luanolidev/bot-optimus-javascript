const { SlashCommandBuilder, ChannelType } = require('discord.js')
const { Guild, User} = require('../../../database/schemas')
const { whitelist_start_button } = require('./_buttons')
const { whitelist_start_embed } = require('./_embeds')

const code = async (interaction, x) => {

    const guildData = await Guild.findOne({ id: interaction.guild.id }) || new Guild({ id: interaction.guild.id })

    const channel = interaction.options.getChannel('canal')
    const category = interaction.options.getChannel('categoria')

    await channel.send({
        components: [whitelist_start_button()],
        embeds: [whitelist_start_embed(interaction.guild.name, interaction)]
    })

    guildData.whitelistCategory = category.id
    await guildData.save()

    await interaction.reply({
        content: `Canal configurado com sucesso ${channel}`, ephemeral: true
    })


}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('set-whitelist')
        .setDescription('Escolha o canal para enviar o botão para inicio do registro da whitelist')
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

        code(interaction, client)
    },
    execute: async (message, client, input1, typo) => {
        return
        code(message, client)
    }
}