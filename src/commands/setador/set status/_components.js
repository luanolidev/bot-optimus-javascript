const { ActionRowBuilder, ButtonBuilder, ActionRow, ButtonStyle } = require('discord.js')
const { Danger, Link, Secondary, Primary, Success } = ButtonStyle

this.button_name = () => {
    return new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId('id')
            .setLabel('text')
            .setEmoji('emoji')
            .setStyle(Primary)
    )
}

this.sociais_buttons = (inter) => new ActionRowBuilder().addComponents(
    new ButtonBuilder().setStyle(Link).setLabel("Connect FiveM").setURL(inter.options.getString('connectbutton') || 'https://discord.gg/TdKHC2F9qE').setEmoji("854360632086626355")
)