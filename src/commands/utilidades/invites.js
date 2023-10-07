const { SlashCommandBuilder } = require('discord.js')
const Discord = require('discord.js')
const { corbot } = require ("../../config.json")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('invites')
        .setDescription('Ver quantos convites o usuário pussui')
        .addUserOption(options =>
            options.setName("usuario")
                .setDescription("O usuário do qual você deseja verificar os convites.")
                .setRequired(true)
        ),




    
        run: async (interaction, client, typo) => {
      
        const user = interaction.options.getUser('usuario');
        
        let invites = await interaction.guild.invites.fetch();
        let userInv = invites.filter(u => u.inviter && u.inviter.id === user.id);

        let i = 0;
        userInv.forEach(inv => i += inv.uses);

        const embed = new Discord.EmbedBuilder()
            .setColor(corbot)
            .setAuthor({ name: user.tag, iconURL: user.displayAvatarURL({ dynamic: true }) })
            .setTitle("Contagem de convites do usuário")
            .setDescription(`${user.tag} possui **${i}** convites.`)
            .setTimestamp();

        await interaction.reply({ embeds: [embed], ephemeral: true });
    }
}