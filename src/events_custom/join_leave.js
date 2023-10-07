const { Guild } = require('../database/schemas')
const { check } = require("../configs/utils/debug")
const { client } = require('../index')
const { welcome_message_embed, quit_message_embed } = require('../global_embeds/_embeds_memberadd')

client.on("guildMemberAdd", async (member) => {

    const guildData = await Guild.findOne({ id: member.guild.id }) || new Guild({ id: member.guild.id })
    if (guildData.joinChannel === null) return

    const channel = client.channels.cache.get(guildData.joinChannel)

    channel.send({ embeds:[welcome_message_embed(member)] }).catch(async err => {await check(`${err}`) })

})

client.on("guildMemberRemove", async (member) => {

    const guildData = await Guild.findOne({ id: member.guild.id }) || new Guild({ id: member.guild.id })
    if (guildData.quitChannel === null) return

    const channel = client.channels.cache.get(guildData.quitChannel)

    channel.send({ embeds:[quit_message_embed(member)] }).catch(async err => { await check(`${err}`) })

})