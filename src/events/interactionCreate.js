const { Guild, Channel } = require('../database/schemas')
const Guilds = Guild

module.exports = {
  name: "interactionCreate",
  async execute(interaction, client = interaction.client, typo) {
    if (interaction.isCommand())
      client.commands
        .get(interaction.commandName)
        ?.run(interaction, client, typo);
  },
};