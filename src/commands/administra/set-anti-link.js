const { QuickDB } = require("quick.db")
const db = new QuickDB();
const { SlashCommandBuilder } = require('discord.js')
const Discord = require('discord.js')
const { corbot } = require ("../../config.json")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('set-anti-link')
        .setDescription('Veja as informaçao de seu plano'),

    run: async (interaction, client, typo) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) {
        interaction.reply({ content: `Você não possui permissão para utilizar este comando.`, ephemeral: true })
    } else {
        let embed_g = new Discord.EmbedBuilder()
        .setColor(corbot)
        .setDescription(`Olá ${interaction.user}, o sistema de antilink foi \`ativado\`.`);

        let embed_r = new Discord.EmbedBuilder()
        .setColor(corbot)
        .setDescription(`Olá ${interaction.user}, o sistema de antilink foi \`desativado\`.`);

        let confirm = await db.get(`antilink_${interaction.guild.id}`);

        if (confirm === null || confirm === false) {
            interaction.reply({ embeds: [embed_g] })
            await db.set(`antilink_${interaction.guild.id}`, true)
        } else if (confirm === true) {
            interaction.reply({ embeds: [embed_r] })
            await db.set(`antilink_${interaction.guild.id}`, false)
        }
    }

  }
}