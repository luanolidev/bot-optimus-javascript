const { EmbedBuilder } = require('discord.js')
const { check } = require('../../configs/utils/debug')
const [ off ] = ['#2F3136']
const { corbot } = require("../../config.json")


this.question_embed = (infos = {}, user, guild, serverName, question,) => {
    let text = `\n\n- _Você possui 1 minuto para responder cada pergunta!_\n- _Somente você e o bot possuem acesso a este canal!_\n\n**Se falhar, terá que realizar a whitelist novamente!**`

    const embed = new EmbedBuilder()
        .setTitle(serverName)
        .setThumbnail(guild.iconURL())
        .setDescription(question + text)
        .setColor(corbot)

    return embed
}

this.whitelist_approved = (infos = {}, user, guild) => {
    const embed = new EmbedBuilder()
        .setTitle("APROVADO NA WHITELIST")
        .setColor(corbot)
        .setThumbnail(guild.iconURL())
        .setDescription(`> **Usuario:**\n${user.username} / \`${user.tag}\`\n\n> **Nome do personagem**\n\`\`\`fix\n${infos.nome}\`\`\`\n> **ID no jogo:** \`${infos.id}\`\n\n> **Total de acertos:** \`${infos.acertos}\``)
        

    return embed
}

this.whitelist_refused = (infos = {}, user, guild) => {
    const embed = new EmbedBuilder()
        .setTitle("REPROVADO NA WHITELIST")
        .setColor(corbot)
        .setThumbnail(guild.iconURL())
        .setDescription(`> **Usuario:**\n${user.username} / \`${user.tag}\`\n\n> **Nome do personagem**\n\`\`\`fix\n${infos.nome}\`\`\`\n> **ID no jogo:** \`${infos.id}\`\n\n> **Total de acertos:** \`${infos.acertos}\`\n> **Motivo:**\`Errou muitas perguntas!\``)
        

    return embed
}

this.configuration_unfinished = (aprovado,reprovado, guild,autorole) => {
    check(`${aprovado}\n${reprovado}`)
    const embed = new EmbedBuilder()
        .setColor(corbot)
        .setDescription(`${autorole === null ? 'cargo de aprovado não definido \`/setcargoaprovado\`' : ''}\n${aprovado === null ? 'Canal de aprovado não definido \`/setaprovado\`' : ''}\n${reprovado === null? 'Canal de reprovado não definido \`/setreprovado\`' : '' }`)

    return embed
    
}

this.whitelist_popup_embed = () => new EmbedBuilder()
    .setDescription('Realize sua whitelist clicando no botão abaixo')
    .setColor(off)