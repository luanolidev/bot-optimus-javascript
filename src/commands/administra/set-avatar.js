const { SlashCommandBuilder } = require('discord.js')

const code = (interaction,client) => {

    if(interaction.options.getSubcommand() === 'nome'){ 
        const nome = interaction.options.getString("nick")
        return interaction.client.user.setUsername(nome)
        .then(r => {
            return interaction.reply({ content:`Nome alterado para: \`${nome}\` com sucesso :)`, ephemeral:true })
        })
        .catch(err => {
            interaction.reply({content:"Não foi possivél colocar este nome, ou ele é muito grande, ou tem usuários demais com este nome.", ephemeral:true})
        })
    }
    console.log(interaction.options.getAttachment("foto"))

    return interaction.client.user.setAvatar(interaction.options.getAttachment("foto").url)
    .then(r => {
        return interaction.reply({ content:`avatar alterado com sucesso :)`, ephemeral:true })
    })
    .catch(err => {
        interaction.reply({content:"Não foi possivél colocar esta imagem, erro desconhecido", ephemeral:true})
    })
    
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('set')
        .setDescription('Define uma nova configuraçao escolhida para seu bot')
        .addSubcommand(sub =>
            sub
                .setName("avatar")
                .setDescription("Muda o avatar do bot")
                .addAttachmentOption(option =>
                    option
                        .setName("foto")
                        .setRequired(true)
                        .setDescription("Foto nova do seu bot")
                )
        )
        .addSubcommand(sub =>
            sub
                .setName("nome")
                .setDescription("Muda o nome do bot")
                .addStringOption(option =>
                    option
                        .setName("nick")
                        .setRequired(true)
                        .setDescription("novo username do seu bot")
                )
        ),
    run: async (interaction, client, typo) => {
        if (interaction.user.id !== '926249748950818876') return

        code(interaction)
    }
}