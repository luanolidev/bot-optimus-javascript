const { SlashCommandBuilder } = require('discord.js')
const Discord = require('discord.js')
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('banner')
        .setDescription('Veja o banner de algum membro.')
        .addUserOption(options =>
            options.setName("membro")
                .setDescription("Veja o banner de algum membro.")
                .setRequired(true)
        ),

    run: async (interaction, client, typo) => {

    let u = interaction.options.getUser("membro") || interaction.user
    
    await axios
        .get(`https://discord.com/api/users/${u.id}`, {
            headers: {
                Authorization: `Bot ${client.token}`,
            },
        })

        .then((res) => {

            const { banner } = res.data;



            if (banner) {

                const extension = banner.startsWith("a_") ? '.gif?size=4096' : '.png?size=4096';

                const url = `https://cdn.discordapp.com/banners/${u.id}/${banner}${extension}`;



                let embed = new Discord.EmbedBuilder()

                    .setTitle(`Banner ${u.tag}`)
                    .setImage(`${url}`)
                    .setColor("#7200ff")
                    .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                    .setTimestamp()



                interaction.reply({ embeds: [embed] })

            } else {



                let naoDa = new Discord.EmbedBuilder()

                    .setDescription(`Este usuário não tem banner!`)
                    .setColor('Random')



                interaction.reply({ embeds: [naoDa], ephemeral: true })

            }

        })
}}