const Discord = require("discord.js");
const { getServerDataInd, getServersData } = require("../Tools/global");
const fs = require("fs");

module.exports = {

	name: "setup-logs",
	description: "Choisis un salon où sera affiché les logs des commandes",
	permission: Discord.PermissionFlagsBits.Administrator,
	dm: false,
	options: [
		{
			type: "boolean",
			name: "état",
			description: "Active / désactive",
			required: true,
		},
		{
			type: "channel",
			name: "salon",
			description: "Salon d'affichage des logs",
			required: false,
		},
	],

	async run(bot, message, args) {

		const serverDataInd = getServerDataInd(message.guild.id);
		const serversData = getServersData();

		serversData.servers[serverDataInd].options.logs = args.getBoolean("état");
		if (args.getChannel("salon") && args.getChannel("salon").type === 0) serversData.servers[serverDataInd].logsChannel = args.getChannel("salon").id;
		if ((serversData.servers[serverDataInd].logsChannel && !message.guild.channels.cache.find(c => c.id === serversData.servers[serverDataInd].logsChannel)) || !serversData.servers[serverDataInd].logsChannel) {
			serversData.servers[serverDataInd].logsChannel = "";
			serversData.servers[serverDataInd].options.logs = false;
		}
		fs.writeFileSync("ServersData/servers.json", JSON.stringify(serversData));

		message.reply({ content: `L'affichage des logs des commandes est **${args.getBoolean("état") && serversData.servers[serverDataInd].logsChannel ? "activé" : "désactivé"}** ! \n${serversData.servers[serverDataInd].logsChannel === "" ? "*⚠️ Il n'y a aucun salon TEXTUEL choisi, ce qui est indispensable pour activer la fonctionnalité*" : `Le salon choisi est <#${serversData.servers[serverDataInd].logsChannel}>`}.`, ephemeral: true });
	},
};