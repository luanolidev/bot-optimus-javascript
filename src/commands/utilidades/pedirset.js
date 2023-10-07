const { SlashCommandBuilder, messageLink } = require('discord.js')
const Discord = require('discord.js')
const { corbot } = require("../../config.json")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pedir-set')
        .setDescription('comando para pedir setagem')
        .addStringOption(options =>
            options.setName("nome")
                .setDescription("mencione quem sera setado")
                .setRequired(true)

        )
        .addStringOption(options =>
            options.setName("id")
                .setDescription("Informe o id de quem sera setado")
                .setRequired(true)

        ).addStringOption(options =>
            options.setName("fac-org")
                .setDescription("Qual fac/org sera setado")
                .setRequired(true)

        ).addStringOption(options =>
            options.setName("tipo-de-setagem")
                .setDescription("discord ou jogo")
                .setRequired(true)
        )
        .addStringOption(options =>
            options.setName("ordem-de-setagem")
                .setDescription("mecione Quem mandou setar")
                .setRequired(true)

        ),
    run: async (interaction, client, typo) => {
        await interaction.deferReply({fetchReply: true})

    let nome = interaction.options.getString("nome");
    let ID = interaction.options.getString("id");
    let org = interaction.options.getString("fac-org");
    let ts = interaction.options.getString("tipo-de-setagem");
    let os = interaction.options.getString("ordem-de-setagem");

    const embed = new Discord.EmbedBuilder()
        .setColor(corbot)
        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
        .setTitle("Pedido de Setagem:")
        .setAuthor({ iconURL: interaction.user.displayAvatarURL(), name: `${interaction.user.tag} << Membro que Pediu` })
        .setDescription(`**> Nome:**\n${nome}\n**> ID no jogo:**\n${ID}\n**> Organizaçao:**\n${org}\n**> Tipo de Setagem:**\n${ts}\n**> Ordem da Sentagem:**\n${os}`)
        .setFooter({ text: "✅ - Membro Setado | ❌ - Membro não Setado"})
        
    await interaction.editReply({ embeds: [embed] }).then(msg => {
        msg.react('<a:1003002527672967310:1082742786861838336>')
        msg.react('<a:1003002573202145341:1082742819191537694>')
    })
}}