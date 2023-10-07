const { SlashCommandBuilder, IntegrationApplication } = require('discord.js')
const { Guild } = require('../../database/schemas')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('set-autorole')
        .setDescription('Defina um cargo automatico para quando um novo usuario entrar no servidor')
        .addRoleOption(role =>
            role.setName("cargo").setDescription("cargo a ser adicionado").setRequired(true)),
    run: async (interaction, client, typo) => {

        code(interaction)
    }
}

const code = async (interaction) => {
    const roleID = interaction.options.getRole("cargo").id
    const guildData = await Guild.findOne({ id: interaction.guild.id }) || new Guild({ id: interaction.guild.id })

    guildData.autoRole = roleID
    await guildData.save()

    interaction.reply({ content: `Cargo definido com sucesso  ${interaction.options.getRole("cargo")}`, ephemeral: true })
}