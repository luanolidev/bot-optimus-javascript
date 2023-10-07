const [spotifyGreen, twitterBlue, softRed, sucessYellow, attentionPurple, off] = ['#1DB954', '#1DA1F2', '#de3f44', 'e6cc00', '#db23bc', '#2F3136']
const { EmbedBuilder } = require('discord.js')
const { client } = require('../index')
const { corbot } = require("../config.json")

this.welcome_message_embed = (member) => new EmbedBuilder()

    .setTitle(`<a:863940876426149898:1083145785903939585>Um viajante acabou de chegar!`)
    .setDescription(`Olá ${member.user}!\n<a:985334616095350804:1083144829397106718> Boas vindas a nossa Cidade;\n<a:985334616095350804:1083144829397106718> Não se esqueça de ler nossas **Regras!**\n<a:985334616095350804:1083144829397106718> Agora temos Client>.members.cache.size moradores em nossa cidade!`)
    .setColor(off)
    .setFooter({ text: `ID: ${member.user.id}` })
    .setThumbnail(member.user.avatarURL())
    .setImage("https://cdn.discordapp.com/attachments/1079880799215689859/1080551834533511199/bannerdefault.png")
    .setTimestamp()

   this.quit_message_embed = (member) => new EmbedBuilder()
  
   .setDescription(`> ${member.user}\n saiu do servidor! espero que volte algum dia😢`)
   .setTitle(`<a:863940875029053452:1083145813556990042>Saiu do servidor ${member.guild.name}!`)
   .setColor(off)
   .setFooter({ text: `ID: ${member.user.id}` })
   .setThumbnail(member.user.avatarURL())
   .setImage("https://cdn.discordapp.com/attachments/1079880799215689859/1080551834533511199/bannerdefault.png")
   .setTimestamp()



