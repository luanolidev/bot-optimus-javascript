module.exports = {
    execute: (interaction) => {
        interaction.reply(`${interaction.user} solicitou o fechamento do ticket, este ticket será excluído em 5 segundos...`)

        setTimeout(() => {

            try {

                interaction.channel.delete()

            } catch (e) {

                return;

            }

        }, 5000)

    }
}