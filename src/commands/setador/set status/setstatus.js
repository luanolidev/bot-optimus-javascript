const { SlashCommandBuilder } = require('discord.js')
const FiveM = require('fivem-stats');
const { sociais_buttons } = require('./_components');
const { online_ad_embed, offline_ad_embed } = require('./_embeds');
const { Guild } = require('../../../database/schemas');
const { online_ad_embed2, offline_ad_embed2 } = require('../../../global_embeds/_embeds_fivem');
const { sociais_buttons2 } = require('../../../global_embeds/_components');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('set-status')
        .setDescription('Seta canal do status do servido')
        .addChannelOption(options =>
            options.setName("canal")
                .setDescription("Coloque o nome do canal.")
                .setRequired(true)

        )
        .addStringOption(options =>
            options.setName("connectip")
                .setDescription("Ip para conectar")
                .setRequired(true)

        )
        .addStringOption(options =>
            options.setName("porta")
                .setDescription("porta do servidor :<valores>")
                .setRequired(true)

        )
        .addStringOption(options =>
            options.setName("connectbutton")
                .setDescription("link para conectar")
                .setRequired(false)

        ),
    run: async (interaction, client, typo) => {

    const guildData = await Guild.findOne({ id: inter.guild.id }) || new Guild({ id: inter.guild.id })

    var data = new Date();

    const dataAtual = `[` + data.getHours() + ':' + data.getMinutes() + ':' + data.getSeconds() + `]`

    const server = await new FiveM.Stats(`${inter.options.getString('connectip')}:${inter.options.getString("porta")}`);
    server.getPlayers().then(players => {
        server.getMaxPlayers().then(async max => {
            const channel = inter.options.getChannel('canal')
            const newMessage = await channel.send({ embeds: [online_ad_embed(inter, players, max, dataAtual)], components: [sociais_buttons(inter)] })
                .catch(err => console.log(err))

            guildData.stats.msgid = newMessage.id
            guildData.stats.msgChannel = newMessage.channel.id
            guildData.stats.serverIp = inter.options.getString('connectip')
            guildData.stats.ipc = inter.options.getString('porta')
            guildData.stats.url = inter.options.getString("connectbutton")
            guildData.stats.message = newMessage
            await guildData.save()
            loop(newMessage)

        })
    }).catch(async error => {
        console.log(error)
        const msg = await inter.options.getChannel('canal').send({ embeds: [offline_ad_embed(inter.options.getString('connectip', dataAtual))], components: [sociais_buttons(inter)] })
            .catch(err => console.log(err))

        guildData.stats.msgid = msg.id
        guildData.stats.msgChannel = msg.channel.id
        guildData.stats.serverIp = inter.options.getString('connectip')
        guildData.stats.ipc = inter.options.getString('porta')
        guildData.stats.url = inter.options.getString("connectbutton")
        guildData.stats.message = msg
        await guildData.save()
        loop(msg)

    })

    await inter.reply({ content: "Setup Iniciado", ephemeral: true })

    const loop = async (msg) => {
        const ip = `${guildData.stats.serverIp}:${guildData.stats.ipc}`
        const channel = await client.channels.cache.get(guildData.stats.msgChannel)

        if (channel === undefined) return console.log("ERRO: DEFINIR CANAL DE ATUALIZAÇÃO UTILIZANDO /setstatus E DEFINIR ID DO SEU SERVIDOR NO ARQUIVO config.json")


        setTimeout(async () => {
            
            const guildData = await Guild.findOne({ id: inter.guild.id }) || new Guild({ id: inter.guild.id })
            
            const data = new Date
            const dataAtual = `[` + data.getHours() + ':' + data.getMinutes() + ':' + data.getSeconds() + `]`

            const server = new FiveM.Stats(ip);
            server.getPlayers().then(players => {

                server.getMaxPlayers().then(async max => {
                    msg.edit({ embeds: [online_ad_embed2(msg, players, max, dataAtual, guildData.stats.serverIp)], components: [sociais_buttons2(guildData.stats.url)] })
                })
                loop(msg)

            }).catch(error => {
                msg.edit({ embeds: [offline_ad_embed2(guildData.stats.serverIp, dataAtual)], components: [sociais_buttons2(guildData.stats.url)] })
                loop(msg)
            })

            return null
        }, 60000 * 2)
    }

}}