const { SlashCommandBuilder } = require('discord.js')
const Discord = require('discord.js')

const code = (interaction, client) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.BanMembers)) {
        interaction.reply(`${interaction.user}, Você precisa ter a permissão ADMINISTRATOR para executar este comando!`);
    } else {
        let user = interaction.options.getUser("user");
        let motivo = interaction.options.getString("motivo");
        if (!motivo) motivo = "Não definido.";

        let embed = new Discord.EmbedBuilder()
        .setColor("#4ec99c")
        .setDescription(`O usuário ${user} (\`${user.id}\`) foi desbanido com sucesso!`);

        let erro = new Discord.EmbedBuilder()
        .setColor("Red")
        .setDescription(`Não foi possível desbanir o usuário ${user} (\`${user.id}\`) do servidor!`);

        interaction.guild.members.unban(user.id, motivo).then( () => {
            interaction.reply({ embeds: [embed] })
        }).catch(e => {
            interaction.reply({ embeds: [erro] })
        })
    }

}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Desbanir um usuário.')
        .addUserOption(options =>
            options.setName("user")
                .setDescription("Mencione um usuário para ser desbanido.")
                .setRequired(true)

        )
        .addStringOption(options =>
            options.setName("motivo")
                .setDescription("Insira um motivo.")
                .setRequired(true)

        ),


    run: async (interaction, client, typo) => {

        code(interaction, client)
    },
    execute: async (message, client, input1, typo) => {

        code(message, client)
    }
}