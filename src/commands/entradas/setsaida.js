const { SlashCommandBuilder } = require('discord.js')
const { Guild } = require('../../database/schemas')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('set-canal-saida')
    .setDescription('Definir o canal para a mensagem de saída para usuários que sairem do servidor')
    .addChannelOption(option =>
        option.setName('canal')
            .setDescription('Definir o canal para a mensagem de saida para usuários que sairem do servidor')
            .setRequired(true)
    ),
    
  run: async (interaction, client, typo) => {

  if (!interaction.member.permissions.has("ManageGuild")) return interaction.reply({ content: `:x: | ${interaction.user} - Voce nao tem permissão para usar esse comando` })

  const canal = interaction.options.getChannel('canal') || interaction.channel
  const guildData = await Guild.findOne({ id: interaction.guild.id }) || new Guild({ id: interaction.guild.id })

  guildData.quitChannel = canal.id || interaction.channel.id
  await guildData.save()

  interaction.reply({ content: `✅ |${interaction.user} - canal de saida definido para ${canal} com sucesso.`, ephemeral: true })
}}

