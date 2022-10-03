const Discord = require("discord.js");
const { getServerDataInd, getServersData } = require("../Tools/global");
const fs = require('fs');

module.exports = {

	name: "setup-new-member-role",
	description: "Choisis un role à attribuer aux nouveaux membres",
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
            description: "Rôle à attribuer",
            required: false
        }
    ],

	async run(bot, message, args) {

        const serverDataInd = getServerDataInd(message.guild.id);
        const serversData = getServersData();

        serversData.servers[serverDataInd].options.newMemberRole = args.getBoolean("état");
        if (args.getRole("role")) serversData.servers[serverDataInd].newMemberRole = args.getRole("role").id;
        if ((serversData.servers[serverDataInd].newMemberRole && !message.guild.roles.cache.find(r => r.id === serversData.servers[serverDataInd].newMemberRole)) || !serversData.servers[serverDataInd].newMemberRole) {
            serversData.servers[serverDataInd].newMemberRole = "";
            serversData.servers[serverDataInd].options.newMemberRole = false;
        }
        fs.writeFileSync(`ServersData/servers.json`, JSON.stringify(serversData));

        message.reply({ content: `L'attribution d'un rôle aux nouveaux membres est **${args.getBoolean("état") && serversData.servers[serverDataInd].newMemberRole ? 'activé' : 'désactivé'}** ! \n${serversData.servers[serverDataInd].newMemberRole === "" ? '*⚠️ Il n\'y a aucun rôle choisi, ce qui est indispensable pour activer la fonctionnalité*' : `Le rôle choisi est <@&${serversData.servers[serverDataInd].newMemberRole}>`}.`, ephemeral: true });
    }
}