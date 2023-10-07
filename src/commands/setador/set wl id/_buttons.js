const { ActionRowBuilder, ButtonBuilder, ActionRow, ButtonStyle } = require('discord.js')
const { Danger, Link, Secondary, Primary, Success } = ButtonStyle

this.whitelist_start_button = () => {
    const comp = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId("whitelist_liberar").setLabel("Liberar ID").setStyle(Secondary).setEmoji("863940875671306270")
    );
    return comp;
};