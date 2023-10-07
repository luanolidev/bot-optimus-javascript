const { Guild } = require("../../../database/schemas")
const { embed_compra } = require('./_embeds')
const { ChannelType, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const { Danger} = ButtonStyle

module.exports = {
    execute: async (interaction) => {

        console.log("sistema de ticket iniciado")

        const guildData = await Guild.findOne({ id: interaction.guild.id }) || new Guild({ id: interaction.guild.id })

        console.log("Procura por guilda finalizada")

        console.log(guildData)

        const parent = guildData.ticket[`${interaction.values[0]}`]

        console.log('Encontrando parente para criar ticket...')

        console.log(parent)

        let text
        if (interaction.values[0] === 'billing') text = 'doações'
        if (interaction.values[0] === 'support') text = 'suporte'
        if (interaction.values[0] === 'report') text = 'denuncias'
        
        console.log("tipo de ticket: "+text)
        let nome = `📨-${interaction.user.id}`;
        let categoria = parent
        if (!interaction.guild.channels.cache.get(categoria)) categoria = null;
        if (interaction.guild.channels.cache.find(c => c.name === nome)) return interaction.reply({ content: `❌ Você já possui um ticket aberto em ${interaction.guild.channels.cache.find(c => c.name === nome)}!`, ephemeral: true })

        console.log("criando canal....")
        
        interaction.guild.channels.create({
            name: nome,
            type: ChannelType.GuildText,
            parent: categoria,
            permissionOverwrites: [
                 {
                    id: interaction.guild.id,
                    deny: [
                        PermissionFlagsBits.ViewChannel,
                        PermissionFlagsBits.SendMessages,
                        PermissionFlagsBits.AttachFiles,
                        PermissionFlagsBits.EmbedLinks,
                        PermissionFlagsBits.AddReactions
                    ]
                },
                {
                    id: interaction.user.id,
                    allow: [
                        PermissionFlagsBits.ViewChannel,
                        PermissionFlagsBits.SendMessages,
                        PermissionFlagsBits.AttachFiles,
                        PermissionFlagsBits.EmbedLinks,
                        PermissionFlagsBits.AddReactions
                    ]
                }]
        }).then(async (ch) => {

            await interaction.reply({ content: ` ${interaction.user}, seu ticket foi aberto em ${ch}!`, ephemeral: true })

            const button = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId("fechar_ticket")
                        .setLabel("Sair Ticket")
                        .setEmoji("🔒")
                        .setStyle(Danger)
                );

            ch.send({ embeds: [embed_compra(interaction, text)], components: [button] }).then(m => {

                m.pin()

            })
        })
    }
}
