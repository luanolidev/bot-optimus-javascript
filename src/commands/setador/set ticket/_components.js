const { ActionRowBuilder, ButtonStyle, SelectMenuBuilder } = require('discord.js')
const { Danger, Link, Secondary, Primary, Success } = ButtonStyle


this.ticket_painel_select = () => new ActionRowBuilder().addComponents(
    new SelectMenuBuilder()
        .setCustomId("novo_ticket")
        .setPlaceholder("Selecione  uma categoria")
        .addOptions(
            {
                label: "Suporte",
                description: "Está com problemas para jogar na cidade?",
                emoji: '🙋‍♂️',
                value: "support"
            },
            {
                label: "Doações",
                description: "Tire sua dúvida ou envie comprovantes.",
                emoji: '💎',
                value: "billing"
            },
            {
                label: "Denúncias",
                description: "Denúncia alguém que descumpriu as regras da cidade!",
                emoji: '🚨',
                value: "report"
            }
        )
);
