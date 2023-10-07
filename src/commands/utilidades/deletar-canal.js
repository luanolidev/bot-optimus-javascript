const { SlashCommandBuilder } = require('discord.js')
const Discord = require('discord.js')
const { corbot } = require ("../../config.json")
const { PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('deletar-canal')
        .setDescription('Comando para deletar um canal.'),

        run: async (interaction, client, typo) => {

        const e = new Discord.EmbedBuilder()
        .setDescription(`❌ Eu não tenho a permissão **Gerenciar Canais** no servidor!`)
        .setColor(corbot)
    
        const e1 = new Discord.EmbedBuilder()
        .setDescription(`❌ Você não tem a permissão **Gerenciar Canais** no servidor!`)
        .setColor(corbot)
    
        if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return  interaction.reply({ embeds: [e1], ephemeral: true })
        if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [e], ephemeral: true })

        const e2 = new Discord.EmbedBuilder()
        .setTitle(`🗑 Deletarcanal`)
        .setDescription(`Você está prestes a apagar o canal ${interaction.channel}, \n\n**Lembrando que essa ação é irreversível!**`)
        .setColor('Random')
        .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true })})
        .setTimestamp()

        const ac = new Discord.ActionRowBuilder()
        .addComponents(
            new Discord.ButtonBuilder()
            .setLabel("Sim")
            .setCustomId("yes")
            .setStyle(3)
            .setEmoji("✅"),
            new Discord.ButtonBuilder()
            .setLabel("Não")
            .setCustomId("no")
            .setStyle(4)
            .setEmoji("❌")
        )

        const ii = await interaction.reply({ embeds: [e2], components: [ac] })

        const ccl = ii.createMessageComponentCollector()
        ccl.on("collect", async(wiu) => { 
            
            if(wiu.user.id !== interaction.user.id) return;

            switch (wiu.customId) {

                case "yes":
                
                const e3 = new Discord.EmbedBuilder()
                .setDescription("\n\n⚠ **Este canal será apagado em \`5\` segundos.**")
                .setColor(corbot)
                .setTimestamp()

                wiu.update({ embeds: [e3], components: [] }).then(() => {
                    setTimeout(() => {

                    
                    interaction.channel.delete().catch(er => {

                        const e4 = new Discord.EmbedBuilder()
                        .setDescription(`❌ **Não foi possível deletar este canal.**`)
                        .setColor(corbot);
                        wiu.followUp({ embeds: [e4] })

                        console.log(er);
                        interaction.deleteReply();
                    })
                    

                    }, 5000)
                })

                break;

                case "no": 

                const e5 = new Discord.EmbedBuilder()
                .setDescription(`⚠ **O exclusão do canal foi cancelado pelo autor.**`)
                .setColor(corbot)

                wiu.update({ embeds: [e5], components: [] })

                break;

                default: return;

            }

        })
}};
