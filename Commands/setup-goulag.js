const Discord = require("discord.js");
const { getServerDataInd, getServersData } = require("../Tools/global");
const fs = require('fs');

module.exports = {

	name: "setup-goulag",
	description: "Active / désactive le goulag et choisis un rôle à attribuer (pas obligatoire)",
	permission: Discord.PermissionFlagsBits.Administrator,
	dm: false,
    options: [
        {
            type: "boolean",
            name: "état",
            description: "Active / désactive",
            required: true
        },
        {
            type: "role",
            name: "role",
            description: "Rôle Goulag",
            required: false
        }
    ],

	async run(bot, message, args) {

        const serverDataInd = getServerDataInd(message.guild.id);
        const serversData = getServersData();

        serversData.servers[serverDataInd].options.goulag = args.getBoolean("état");
        if (args.getRole("role")) serversData.servers[serverDataInd].goulagRole = args.getRole("role").id;
        if (serversData.servers[serverDataInd].goulagRole && !message.guild.roles.cache.find(r => r.id === serversData.servers[serverDataInd].goulagRole)) serversData.servers[serverDataInd].goulagRole = "";
        fs.writeFileSync(`ServersData/servers.json`, JSON.stringify(serversData));

        message.reply({ content: `Le goulag est **${args.getBoolean("état") ? 'activé' : 'désactivé'}** ! \n${serversData.servers[serverDataInd].goulagRole === "" ? 'Il n\'y a aucun rôle attribué au goulag' : `Le rôle attribué est <@&${serversData.servers[serverDataInd].goulagRole}>`}.`, ephemeral: true });
    }
}