const { SlashCommandBuilder } = require('discord.js')
const Discord = require('discord.js')
const { corbot } = require("../../config.json")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dm')
        .setDescription('mande uma mensagen na dm de alguém')
        .addUserOption(options =>
            options.setName("user")
                .setDescription("mencione alguém para manda a mensagem")
                .setRequired(true)

        )
        .addStringOption(options =>
            options.setName("mensagem")
                .setDescription("Mensagem que desejar enviar para o user")
                .setRequired(true)

        ),

    run: async (interaction, client, typo) => {

    let msg = interaction.options.getString('mensagem')
        let user = interaction.options.getUser('user')
        const embed = new Discord.EmbedBuilder()
            .setColor(corbot)
            .setTimestamp()
            .setTitle(`Você tem uma nova mensagem do ${interaction.user.username}!`)
            .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .addFields({ name: 'Lembrar:', value: `Não me responda porque ${interaction.user.tag} não receberá a resposta, leve suas coisas para o dms deles :)`})
            .addFields({ name: `Mensagem de: ${interaction.user.username}`, value: `${msg}` })
            .setFooter({ text: "Fico contente em ajudar", iconURL: client.user.displayAvatarURL({ dynamic: true }) })

      try {
        await user.send({ embeds: [embed]})
      } catch (error) {
        return interaction.reply({ 
                    embeds: [
                    new Discord.EmbedBuilder()
                        .setColor("#f32121")
                        .setAuthor({ name: user.tag, iconURL: user.displayAvatarURL({ dynamic: true })})
                        .setDescription("A dm deste user está bloqueada")
                        .setFooter({ text: "Fico contente em ajudar ", iconURL: client.user.displayAvatarURL({ dynamic: true })})],ephemeral:true})
      }
    interaction.reply({
                    embeds: [
                    new Discord.EmbedBuilder()
                        .setColor(corbot)
                        .setAuthor({ name: user.tag, iconURL: user.displayAvatarURL({ dynamic: true })})
                        .setDescription("Sua mensagem foi enviada com sucesso") ],ephemeral:true})
}}

