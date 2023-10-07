const { SlashCommandBuilder } = require('discord.js')
const { aviso_embed } = require('./_embeds');

const code = (interaction) => {
    let channel = interaction.options.getChannel("canal");
    let title = interaction.options.getString("titulo");
    let desc = interaction.options.getString("mensagem");

    if (!interaction.member.permissions.has('ManageMessages')) return interaction.reply({ content: "${interaction.user}, Você precisa ter a permissão ADMINISTRATOR para executar este comando!" })

    channel.send({ embeds: [aviso_embed(title,desc, interaction)] });

    interaction.reply({ content: `aviso postado no canal ${channel}`, ephemeral: true })
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('aviso')
        .setDescription('Envie uma mensagem de aviso em um canal de texto')
        .addChannelOption(options =>
            options.setName("canal")
                .setDescription("Coloque o nome do canal.")
                .setRequired(true)

        )
        .addStringOption(options =>
            options.setName("titulo")
                .setDescription("Titulo do aviso")
                .setRequired(true)

        )
        .addStringOption(options =>
            options.setName("mensagem")
                .setDescription("Mesagem que você que enviar")
                .setRequired(true)
        ),


    run: async (interaction, client, typo) => {

        code(interaction)
    },
    execute: async (message, client, input1, typo) => {
        return;
        code(message)
    }
}