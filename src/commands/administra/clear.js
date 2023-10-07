const { SlashCommandBuilder } = require('discord.js')
const Discord = require('discord.js')
const { corbot } = require("../../config.json")

    module.exports = {
        data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('impe as mensagens do canal de texto')
        .addNumberOption(options =>
            options.setName("numero")
                .setDescription("Informe a quantidade de mensagens que você que apagar!")
                .setRequired(true)
    
        ),
    
        run: async (interaction, client, typo) => {

        let numero = interaction.options.getNumber('numero')

        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageMessages)) {
            interaction.reply({ content: `Você não possui permissão para utilizar este comando.`, ephemeral: true })
        } else {

            if(!interaction.guild.members.me.permissions.has("ManageMessages"))
            return interaction.reply("Parece que estou sem permissões suficientes!");

            if (parseInt(numero) > 100 || parseInt(numero) <= 0) {

                let embed = new Discord.EmbedBuilder()
                    .setColor("corbot")
                    .setDescription(`\`/clear [1 - 99]\``);

                interaction.reply({ embeds: [embed] })

            } else {

                interaction.channel.bulkDelete(parseInt(numero))

                const botcor = interaction.guild.members.cache.get(client.user.id)

                let embed = new Discord.EmbedBuilder()
                     .setColor(corbot)
                    .setAuthor({ name: `Limpeza concluida com sucesso`, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                    .setImage("https://cdn.discordapp.com/attachments/935398454388224000/1030504754838782013/standard_4.gif")
                    .setDescription(`O chat ${interaction.channel} teve **${numero}** mensagens apagadas por **${interaction.user.username}**.`);

                interaction.reply({ embeds: [embed] })
                
                setTimeout(() => {
                    interaction.deleteReply()
                }, 5000)

              

            }

        }

    }
}