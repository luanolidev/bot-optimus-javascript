const { question_embed, whitelist_approved, whitelist_refused, configuration_unfinished, whitelist_popup_embed } = require('./_embeds')
const questions = require('../../database/questions')
const { Guild, User } = require('../../database/schemas')
const { check } = require('../../configs/utils/debug')
const { link_access_button } = require('./_button')
const mysql = require('mysql')

module.exports = {
    execute: async (interaction) => {
        const { client } = require('../../index')
        const parent = await Guild.findOne({ id: interaction.guild.id }) || new Guild({ id: interaction.guild.id })
        const userData = await User.findOne({ id: interaction.user.id }) || new User({ id: interaction.user.id })
        const [aprovado, reprovado, autorole] = [parent.approvedChannel, parent.reprovedChannel, parent.approvedRole]

        if (userData.whitelistOpen) return interaction.reply({ content: 'Você já possui uma whitelist em aberto.', ephemeral: true })

        if (aprovado === null || reprovado === null || autorole === null) return interaction.reply({ embeds: [configuration_unfinished(aprovado, reprovado, interaction.guild, autorole)], ephemeral: true })
        const newChannel = await interaction.guild.channels.create({
            name: interaction.user.id,
            type: 0,
            parent: parent.whitelistCategory,
            permissionOverwrites: [
                {
                    id: interaction.guild.roles.everyone,
                    deny: ['ViewChannel', 'SendMessages', 'ReadMessageHistory']
                },
                {
                    id: interaction.user.id,
                    allow: ['ViewChannel', 'SendMessages', 'ReadMessageHistory']
                },
                {
                    id: client.user.id,
                    allow: ['ViewChannel', 'SendMessages', 'ReadMessageHistory']
                }
            ]
        }).catch(err => {
            check(err)
        })
        const url = `https://discord.com/channels/${interaction.guild.id}/${newChannel.id}`
        interaction.reply({ embed: [whitelist_popup_embed()], components: [link_access_button(url)], ephemeral: true })

        userData.whitelistOpen = true
        await userData.save()

        let acertos = 0
        let minimo = 0
        const infos = {
            id: Number,
            acertos: Number,
            nome: String
        }

        let botmsg

        const ask = async (key = 0, edited = false) => {
            if (key === questions.length) {
                if (acertos >= minimo) {
                    const channel = await client.channels.cache.get(aprovado)
                    infos.acertos = acertos

                    await channel.send({
                        embeds: [whitelist_approved(infos, interaction.user, interaction.guild)]
                    })
                    

                    const {ipdb, userdb, senhadb, basedb} = require("../../config.json")
                    const connection = await mysql.createConnection({
                        host: ipdb,
                        user: userdb,
                        password: senhadb,
                        database: basedb,
                    })
                  
      
                          connection.query(`UPDATE vrp_users SET whitelisted = '1' WHERE id = '${infos.id}'`, (err, rows) => {
                            console.error(err)
                          });
                          connection.end()


                    await interaction.member.roles.add(await interaction.guild.roles.cache.get(parent.approvedRole))
                    await interaction.user.send({ embeds: [whitelist_approved(infos, interaction.user, interaction.guild)] }).catch(err => { })
                } else {
                    const channel = await client.channels.cache.get(reprovado)
                    infos.acertos = acertos
                    await channel.send({
                        embeds: [whitelist_refused(infos, interaction.user, interaction.guild)]
                    })

                    await interaction.user.send({ embeds: [whitelist_refused(infos, interaction.user, interaction.guild)] }).catch(err => { })
                }
                await newChannel.delete().catch(err => { })
                userData.whitelistOpen = false
                return await userData.save()
            }


            if (edited === false) {
                botmsg = await newChannel.send({
                    embeds: [question_embed(infos, interaction.user, interaction.guild, interaction.guild.name, questions[key].question)]
                })
            } else {
                botmsg = await botmsg.edit({ embeds: [question_embed(infos, interaction.user, interaction.guild, interaction.guild.name, questions[key].question)] }) 
            }

            const filter = i => i.author.id === interaction.user.id
            const minutos = 1

            const collector = botmsg.channel.createMessageCollector({ filter, max: 1, time: minutos * 60 * 1000 })
            let collected = false
            collector.on('collect', async i => {
                collected = true
                if (questions[key].answer === ``) {
                    if (key === 0) {
                        infos.nome = i.content
                    }
                    if (key === 1) {
                        infos.id = Number(i.content)
                    }
                } else {
                    const resposta = Number(i.content)
                    if (resposta === questions[key].answer) {
                        acertos++
                    }
                }

                await i.delete().catch(err => { })
                key++
                ask(key, true)
            })

            collector.on("end", async i => {

                if (collected === false) {

                    await newChannel.delete().catch(err => { })
                    userData.whitelistOpen = false
                    return await userData.save()

                }

            })

        }
        ask(0, false)
    }
}