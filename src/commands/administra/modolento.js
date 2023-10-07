const { SlashCommandBuilder } = require('discord.js')
const Discord = require('discord.js')
const ms = require("ms")



module.exports = {
    data: new SlashCommandBuilder()
    .setName('modo-lento')
    .setDescription('Configure o modo lento em um canal de texto.')
    .addStringOption(options =>
        options.setName("tempo")
            .setDescription("Coloque o tempo do modo lento [s|m|h].")
            .setRequired(true)

    )
    .addChannelOption(options =>
        options.setName("canal")
            .setDescription("Mencione um canal de texto.")
            .setRequired(true)

    ),



    run: async (interaction, client, typo) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageChannels)) {

        interaction.reply({ content: `${interaction.user}, Você precisa ter a permissão ADMINISTRATOR para executar este comando!`, ephemeral: true })

    } else {



        let t = interaction.options.getString("tempo");

        let tempo = ms(t);

        let channel = interaction.options.getChannel("canal");

        if (!channel || channel === null) channel = interaction.channel;



        if (!tempo || tempo === false || tempo === null) {

            interaction.reply({ content: `Forneça um tempo válido: [s|m|h].`, ephemeral: true })

        } else {

            channel.setRateLimitPerUser(tempo/1000)

        await  interaction.reply({ content: `O canal de texto ${channel} teve seu modo lento definido para \`${t}\`.` })

     

        }

    

    }

}}