const { Guild } = require("../../database/schemas")

module.exports = {
    check: (info) => {
        const top = "\x1b[31m┏╋━━━━━━◥◣◆◢◤━━━━━━━╋┓"
        const bottom = "\x1b[31m┗╋━━━━━━◢◤◆◥◣━━━━━━━╋┛\n"
        console.log(`\n\n${top}\n\n\x1b[33m${info}\n\n${bottom}\n\n`)
    },
    verify: async (interaction) => {
        const guildData = await Guild.findOne({ id: interaction.guild.id }) || new Guild({ id: interaction.guild.id })

        if (interaction.member?.voice?.channel?.id !== guildData.voiceChannel && guildData.voiceChannel !== null) {
            interaction.reply({ embeds: [not_in_voice_embed_error()], ephemeral: true })
            return true
        }
        return false
    }
}