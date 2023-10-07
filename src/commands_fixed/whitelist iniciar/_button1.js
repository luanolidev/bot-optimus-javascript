const { ActionRowBuilder, ButtonBuilder, ActionRow, ButtonStyle} = require('discord.js')
const { Danger, Link, Secondary, Primary, Success } = ButtonStyle

this.link_access_button1 = (url) => new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setURL(url)
            .setLabel("Liberar ID")
            .setStyle(Link)
    );
