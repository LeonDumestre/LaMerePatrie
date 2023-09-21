const Discord = require("discord.js");
const { getServerDataInd, getServersData } = require("../Tools/global");
const fs = require("fs");

module.exports = {

	name: "setup-counter",
	description: "Choisis un salon vocal où sera affiché le nombre de membres sur le serveur",
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
			description: "Salon Vocal",
			required: false,
		},
	],

	async run(bot, message, args) {

		const serverDataInd = getServerDataInd(message.guild.id);
		const serversData = getServersData();

		serversData.servers[serverDataInd].options.counter = args.getBoolean("état");
		if (args.getChannel("salon") && args.getChannel("salon").type === 2) serversData.servers[serverDataInd].counterChannel = args.getChannel("salon").id;
		if ((serversData.servers[serverDataInd].counterChannel && !message.guild.channels.cache.find(c => c.id === serversData.servers[serverDataInd].counterChannel)) || !serversData.servers[serverDataInd].counterChannel) {
			serversData.servers[serverDataInd].counterChannel = "";
			serversData.servers[serverDataInd].options.counter = false;
		}
		fs.writeFileSync("ServersData/servers.json", JSON.stringify(serversData));

		message.reply({ content: `Le compteur de membres est **${args.getBoolean("état") && serversData.servers[serverDataInd].counterChannel ? "activé" : "désactivé"}** ! \n${serversData.servers[serverDataInd].counterChannel === "" ? "*⚠️ Il n'y a aucun salon VOCAL choisi, ce qui est indispensable pour activer la fonctionnalité*" : `Le salon choisi est <#${serversData.servers[serverDataInd].counterChannel}>`}.`, ephemeral: true });

		if (serversData.servers[serverDataInd].options.counter) {
			const channel = message.guild.channels.cache.get(serversData.servers[serverDataInd].counterChannel);
			if (channel) {
				const memberCount = message.guild.memberCount;
				channel.setName(`Membres : ${memberCount}`);
			}
		}
	},
};