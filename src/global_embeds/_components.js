const { ActionRowBuilder, ButtonBuilder, ActionRow, ButtonStyle } = require('discord.js')
const { Link } = ButtonStyle

this.sociais_buttons2 = (url) => new ActionRowBuilder().addComponents(
    new ButtonBuilder().setStyle(Link).setLabel("Entra no servidor")
    .setURL(url || 'https://discord.gg/TdKHC2F9qE')
    .setEmoji("854360632086626355")
)