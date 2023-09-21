import { PermissionFlagsBits } from "discord.js";
import { getServerDataInd, getServersData } from "../Tools/global.js";
import { writeFileSync } from "fs";

export const name = "setup-channels";
export const description = "Choisis les salons où il sera possible de faire des commandes";
export const permission = PermissionFlagsBits.Administrator;
export const dm = false;
export const options = [
	{
		type: "string",
		name: "paramètre",
		description: "add / remove",
		required: false,
	},
	{
		type: "channel",
		name: "salon",
		description: "Nom du salon",
		required: false,
	},
];
export async function run(bot, message, args) {

	const serverDataInd = getServerDataInd(message.guild.id);
	const serversData = getServersData();

	if (args.getString("paramètre") && args.getChannel("salon") && args.getChannel("salon").type === 0) {
		if (args.getString("paramètre") === "add") {
			if (!serversData.servers[serverDataInd].cmdChannels.find(c => c.id === args.getChannel("salon").id)) { serversData.servers[serverDataInd].cmdChannels.push(args.getChannel("salon").id); }
		}
		if (args.getString("paramètre") === "remove") {
			serversData.servers[serverDataInd].cmdChannels.forEach((channel, index) => {
				if (channel === args.getChannel("salon").id) serversData.servers[serverDataInd].cmdChannels.splice(index, 1);
			});
		}
	}

	serversData.servers[serverDataInd].cmdChannels.forEach(function(channel, index) {
		if (!message.guild.channels.cache.find(c => c.id === channel)) serversData.servers[serverDataInd].cmdChannels.splice(index, 1);
	});
	writeFileSync("ServersData/servers.json", JSON.stringify(serversData));

	if (serversData.servers[serverDataInd].cmdChannels.length === 0) {
		{ message.reply({ content: "Il n'y a aucun salon enregistré. \nIl est donc possible d'utiliser les commandes dans **tous les salons** du serveur.", ephemeral: true }); }
	}
	else {
		let listMsg = "";
		serversData.servers[serverDataInd].cmdChannels.forEach(channel => listMsg += `\n• <#${channel}>`);
		message.reply({ content: `Il est possible d'exécuter une commande dans les salons : ${listMsg}`, ephemeral: true });
	}
}