const { SlashCommandBuilder } = require('discord.js')
const { readFileSync, writeFileSync } = require("fs")
const { PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("set-database")
        .setDescription("configure a database para salvar seus usuarios da whitelist")
        .addStringOption(option =>
            option.setName("ipdb")
            .setDescription("ip da sua db na vps")
            .setRequired(true)
        )   
        .addStringOption(option =>
            option.setName("userdb")
            .setDescription("usuario admin de acesso na db")
            .setRequired(true)
        )   
        .addStringOption(option =>
            option.setName("senhadb")
            .setDescription("senha do seu user na db")
            .setRequired(true)
        )    
        .addStringOption(option =>
            option.setName("basedb")
            .setDescription("onde esta o vrp ou só vrp por padrão")
            .setRequired(true)

        )   
        .addStringOption(option =>
           option.setName("portadb")
           .setDescription("onde esta o vrp ou só vrp por padrão")
           .setRequired(true)

        ),

    run: async (interaction, client, typo) => {

    if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return

    const fs = require('fs');
    const path = require('path');
    const configPath = path.resolve(__dirname, '../../../config.json');
    const json = require(configPath);
    
    json.ipdb = interaction.options.getString("ipdb");
    json.userdb = interaction.options.getString("userdb");
    json.senhadb = interaction.options.getString("senhadb") || "";
    json.basedb = interaction.options.getString("basedb");
    json.portdb = interaction.options.getString("portdb") || 3306;
    
    fs.writeFileSync(configPath, JSON.stringify(json, null, 2));
    interaction.reply({ ephemeral:true, content:"informações salvas no seu config.json com sucesso"})
}}