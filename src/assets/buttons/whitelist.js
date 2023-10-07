const { ActionRowBuilder, ButtonBuilder } = require("discord.js");

this.whitelist_start_button = () => {
  const comp = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId("whitelist_start").setLabel("Começa Whitelist").setStyle(1).setEmoji("863940875671306270")
  );
  return comp;
};
