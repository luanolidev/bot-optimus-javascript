const [spotifyGreen, twitterBlue, softRed, sucessYellow, attentionPurple, off] = ['#1DB954', '#1DA1F2', '#de3f44', 'e6cc00', '#db23bc', '#2F3136']
const { EmbedBuilder } = require('discord.js')
const { corbot } = require("../../../config.json")
 
this.embed_compra = (interaction, text) => new EmbedBuilder()
.setColor(corbot)
.setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
.setTitle("TICKET CRIADO COM SUCESSO!  📌")
.setThumbnail(interaction.guild.iconURL({ dynamic: true }))
.setDescription(`Olá ${interaction.user},Todos os responsáveis pelo ticket já estão cientes da abertura

__Categoria Escolhida:__  \`\`\`fix\n${text}\`\`\`    
Caso deseje cancelar ou sair, basta __clicar no botão vermelho.__`);
