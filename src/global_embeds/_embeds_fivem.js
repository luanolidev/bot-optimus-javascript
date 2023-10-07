const [spotifyGreen, twitterBlue, softRed, sucessYellow, attentionPurple, off] = ['#1DB954', '#1DA1F2', '#de3f44', 'e6cc00', '#db23bc', '#2F3136']
const { EmbedBuilder } = require('discord.js')

this.online_ad_embed2 = (inter, players, max, ip) => new EmbedBuilder()
    .setColor(off)
    .setTitle(`CONEXÃO COM O SERVIDOR`)
    .setThumbnail(inter.guild.iconURL({ dynamic: true }))
    .addFields(
        { name: 'Status:', value: '**```\n🟢 Online\n```**', inline: true },
        { name: 'Jogadores online:', value: `**\`\`\`\n[ ${players} / ${max}]\n\`\`\`**`, inline: true },
        { name: 'Servidor:', value: `**\`\`\`\nconnect ${ip} \n\`\`\`**` })
    .setFooter({ text: inter.guild.name +' © Todos os direitos reservados'})

this.offline_ad_embed2 = (connect, data, inter) => new EmbedBuilder()
    .setColor(off)
    .setTitle(`CONEXÃO COM O SERVIDOR`)
    .setThumbnail(inter.guild.iconURL({ dynamic: true }))
    .addFields(
        { name: 'Status:', value: '**```\n🔴  Offline\n```**', inline: true },
        { name: 'Jogadores online:', value: `**\`\`\`\n[Server Off.]\n\`\`\`**`, inline: true },
        { name: 'Servidor:', value: `**\`\`\`\nconnect ${connect}\n\`\`\`**` })
    .setFooter({ text: inter.guild.name +' © Todos os direitos reservados'})