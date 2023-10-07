const { EmbedBuilder } = require("discord.js");
const [spotifyGreen, twitterBlue, softRed, sucessYellow, attentionPurple] = ['#1DB954', '#1DA1F2', '#de3f44', 'e6cc00', '#db23bc']

this.embed_404_user = (text) => {
  const embed = new EmbedBuilder()
    .setColor("FF0000")
    .setDescription(`❌ Ops, user ${text} don't exist.`);

  return embed;
};

this.embed_404_error_message = (text) => {
  const embed = new EmbedBuilder()
    .setColor(softRed)
    .setDescription(`❌ Ops, ${text}.`);

  return embed;
};
