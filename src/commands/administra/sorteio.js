const { SlashCommandBuilder, SlashCommandSubcommandBuilder } = require('discord.js')
const Discord = require('discord.js')
const ms =  require("ms")
const { corbot }= require("../../config.json")

const code = async (interaction) => {

    if (

        !interaction.member.permissions.has(

            Discord.PermissionFlagsBits.ModerateMembers

        )

    ) {

        return interaction.reply({

            content: `${interaction.user}, Você precisa ter a permissão ADMINISTRATOR para executar este comando!`,

            ephemeral: true,

        });

    } else {

        let premio = interaction.options.getString("premio");

        let tempo = interaction.options.getString("tempo");

        let desc = interaction.options.getString("desc");



        let duracao = ms(tempo);



        const button = new Discord.ActionRowBuilder().addComponents(

            new Discord.ButtonBuilder()

                .setCustomId("botao")

                .setEmoji("🎉")

                .setStyle(2)

        );



        let click = [];



        const embed = new Discord.EmbedBuilder()

            .setTitle(`**🎉 Novo sorteio!**`)
            .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
            .setDescription(

                `> Sorteio enviado por : ${interaction.user}\n > Sorteando: **${premio}**\n > Descrição do sorteio: **${desc}** \n\ > Tempo do sorteio: **${tempo}**  \n\n\ Basta clicar no botão para parcipar. \n\ **Boa Sorte!!!**`

            )

            .setTimestamp(Date.now() - ms(tempo))

            .setColor(corbot);



        let erro = new Discord.EmbedBuilder()

            .setColor(corbot)
            .setDescription(`Não foi possível promover o soteio!`);



        const msg = await interaction

            .reply({

                embeds: [embed],

                components: [button],

            })

            .catch((e) => {

                interaction.reply({ embeds: [erro] });

            });



        const coletor = msg.createMessageComponentCollector({

            time: ms(tempo),

        });



        coletor.on("end", (i) => {

            interaction.editReply({

                components: [],

            });

        });



        coletor.on("collect", (i) => {

            if (i.customId === "botao") {

                if (click.includes(i.user.id))

                    return i.reply({

                        content: `**Você ja está no sorteio.**`,

                        ephemeral: true,

                    });

                click.push(i.user.id);

                interaction.editReply({

                    embeds: [embed],

                });

                i.reply({

                    content: "**Você entrou no sorteio**",

                    ephemeral: true,

                });

            }

        });



        setTimeout(() => {

            let ganhador = click[Math.floor(Math.random() * click.length)];



            if (click.length == 0)

                return interaction.followUp(

                    `**Sorteio cancelado pois ninguem participou!**`

                );

            interaction.followUp(

                `**Parabens <@${ganhador}> você ganhou o ${premio}**`

            );

        }, duracao);

    }
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sorteio')
        .setDescription('Criar uma sorteio')
        .addStringOption(options =>
            options.setName("premio")
                .setDescription("Qual será o premio?")
                .setRequired(true)

        )
        .addStringOption(options =>
            options.setName("desc")
                .setDescription("Descrição do premio?")
                .setRequired(true)

        )
        .addStringOption(options =>
            options.setName("tempo")
                .setDescription("Selecione o tempo do sorteio")
                .setRequired(true)
                .addChoices(

                    {

                        name: "30 Segundos",
                        value: "30s",

                    },

                    {

                        name: "1 Minuto",
                        value: "1m",

                    },

                    {

                        name: "5 Minutos",
                        value: "5m",

                    },

                    {

                        name: "10 Minutos",
                        value: "10m",

                    },

                    {

                        name: "15 Minutos",
                        value: "15m",

                    },

                    {

                        name: "30 Minutos",
                        value: "30m",

                    },

                    {

                        name: "45 Minutos",
                        value: "45m",

                    },

                    {

                        name: "1 Hora",
                        value: "1h",

                    },

                    {

                        name: "2 Horas",
                        value: "2h",

                    },

                    {

                        name: "5 Horas",
                        value: "5h",

                    },

                    {

                        name: "12 Horas",
                        value: "12h",

                    },


                    {

                        name: "1 Dia",
                        value: "24h",

                    },

                    {

                        name: "3 dias",
                        value: "72h",

                    },

                    {

                        name: "1 Semana",
                        value: "168h",

                    },

                )
        )


    ,

    run: async (interaction, client, typo) => {

        code(interaction)
    },
    execute: async (message, client, input1, typo) => {
    return
        code(message)
    }
}