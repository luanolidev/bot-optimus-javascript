const { SlashCommandBuilder } = require('discord.js')
const Discord = require('discord.js')
const { corbot }= require("../../config.json")

const code = (interaction, client) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageMessages)) {

        interaction.reply({ content: `${interaction.user}, Você precisa ter a permissão ADMINISTRATOR para executar este comando!`, ephemeral: true })

    } else {

        let embed_fala = interaction.options.getString("embed");

        let normal_fala = interaction.options.getString("normal");

        

        if (!embed_fala && !normal_fala) {

            interaction.reply(`Escreva pelo menos em uma das opções.`)

        } else {

            if (!embed_fala) embed_fala = "⠀";

            if (!normal_fala) normal_fala = "⠀";



            let embed = new Discord.EmbedBuilder()

            .setColor(corbot)

            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })

            .setDescription(embed_fala);



            if (embed_fala === "⠀") {

                interaction.reply({ content: ` Sua mensagem foi enviada!`, ephemeral: true })

                interaction.channel.send({ content: `${normal_fala}` })

            } else if (normal_fala === "⠀") {

                interaction.reply({ content: ` Sua mensagem foi enviada!`, ephemeral: true })

                interaction.channel.send({ embeds: [embed] })

            } else {

                interaction.reply({ content: ` Sua mensagem foi enviada!`, ephemeral: true })

                interaction.channel.send({ content: `${normal_fala}`, embeds: [embed] })

            }

        }

    }

}

module.exports = {
    data: new SlashCommandBuilder()
    .setName('say')
    .setDescription('Faça eu falar')
    .addStringOption(options =>
        options.setName("embed")
            .setDescription("Falarei em embed.")
            .setRequired(false)

    )
    .addStringOption(options =>
        options.setName("normal")
            .setDescription("Falarei normal (sem embed).")
            .setRequired(false)

    ),




    run: async (interaction, client, typo) => {

    code(interaction,client)
    },
    execute: async (message, client, input1, typo) => {

    code(message,client)
    }
}