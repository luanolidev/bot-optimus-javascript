const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require('discord.js');
const { ticket_painel_select } = require('./_components');
const { ticket_menu_embed } = require('./_embeds');
const { Guild } = require('../../../database/schemas')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('set-ticket')
        .setDescription('Enviar Mensagem de Ticket')
        .addChannelOption(option =>
            option.setName('canal-ticket')
                .setDescription('Escolha o canal para enviar o botão do ticket')
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildText)
        )
        .addChannelOption(option =>
            option.setName('categoria-doações')
                .setDescription('Escolha a categoria para o ticket de doações')
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildCategory)
        )
        .addChannelOption(option =>
            option.setName('categoria-suporte')
                .setDescription('Escolha a categoria para o ticket de suporte')
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildCategory)
        )
                .addChannelOption(option =>
            option.setName('categoria-denuncias')
                .setDescription('Escolha a categoria para o ticket de denuncias')
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildCategory)
        ),

    run: async (interaction, client, typo) => {

    let channel = interaction.options.getChannel("canal-ticket");
    let categoria = interaction.options.getChannel("categoria-doações").id
    let categoria2 = interaction.options.getChannel("categoria-suporte").id
    let categoria3 = interaction.options.getChannel("categoria-denuncias").id
    
    if (!interaction.member.permissions.has(PermissionFlagsBits.ManageGuild))
    return interaction.reply({ content: `Você não possui permissão para utilzar este comando!`, ephemeral: true })
    
    const guildData = await Guild.findOne({ id: interaction.guild.id }) || new Guild({ id: interaction.guild.id })
    
    guildData.ticket.billing = categoria
    guildData.ticket.support = categoria2
    guildData.ticket.report = categoria3
  
    await guildData.save()

    interaction.reply({ content: `Sistema de ticket configurado com sucesso.`, ephemeral: true })
    channel.send({ embeds: [ticket_menu_embed(interaction)], components: [ticket_painel_select()] })

}}