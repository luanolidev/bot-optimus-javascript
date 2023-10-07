const { SlashCommandBuilder } = require('discord.js')
const Discord = require('discord.js');
const { permission_error } = require('../../../global_embeds/_embeds');
const { sucess_ban, error_ban } = require('./_embeds');

const code = (interaction) => {
    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.BanMembers)) return interaction.reply({ embeds: [permission_error( "ADMINISTRADOR") ]});

    let userr = interaction.options.getUser("user");
    let user = interaction.guild.members.cache.get(userr.id)
    let motivo = interaction.options.getString("motivo");
    if (!motivo) motivo = "Não definido.";

    user.ban({ reason: [motivo] }).then(() => {
        interaction.reply({ embeds: [sucess_ban(user)] })
    }).catch(e => {
        interaction.reply({ embeds: [error_ban(user)] })
    })

}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Banir um usuário.')
        .addUserOption(options =>
            options.setName("user")
                .setDescription("Usuário que será banido")
                .setRequired(true)

        ).addStringOption(options =>
            options.setName("motivo")
                .setDescription("Motivo do banimento do usuário")
                .setRequired(false)

        ),

    run: async (interaction, client, typo) => {

        code(interaction)
    },
    execute: async (message, client, input1, typo) => {

        code(message)
    }
}