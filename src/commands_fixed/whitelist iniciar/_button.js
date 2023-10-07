const { ActionRowBuilder, ButtonBuilder, ActionRow, ButtonStyle} = require('discord.js')
const { Danger, Link, Secondary, Primary, Success } = ButtonStyle

this.link_access_button = (url) => new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setURL(url)
            .setLabel("Inicar whitelist")
            .setStyle(Link)
    );
