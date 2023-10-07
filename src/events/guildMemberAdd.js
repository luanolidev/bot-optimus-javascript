const { Guild } = require("../database/schemas")

module.exports = {
    name:"guildMemberAdd",
    execute:async member => {
        //REMINDER: IMPORT GUILD
        
        const guildData = await Guild.findOne({ id: member.guild.id }) || new Guild({ id: member.guild.id })
        
        if (guildData.autoRole) {
            let role_id = guildData.autoRole
            let role = member.guild.roles.cache.find(r => r.id === role_id)
            try {
                member.roles.add(role)
            } catch (err) {
                console.log(`Autorole err: ${ err.message }`)
            }
        }

    }
}