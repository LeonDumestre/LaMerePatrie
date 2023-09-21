import { PermissionFlagsBits } from "discord.js";
import { getServerDataInd, getServersData } from "../Tools/global.js";
import { writeFileSync } from "fs";

export const name = "setup-welcome";
export const description = "Choisis un salon où sera affiché les messages d'accueil";
export const permission = PermissionFlagsBits.Administrator;
export const dm = false;
export const options = [
	{
		type: "boolean",
		name: "état",
		description: "Active / désactive",
		required: true,
	},
	{
		type: "channel",
		name: "salon",
		description: "Salon de bienvenue",
		required: false,
	},
];
export async function run(bot, message, args) {

	const serverDataInd = getServerDataInd(message.guild.id);
	const serversData = getServersData();

	serversData.servers[serverDataInd].options.welcome = args.getBoolean("état");
	if (args.getChannel("salon") && args.getChannel("salon").type === 0) serversData.servers[serverDataInd].welcomeChannel = args.getChannel("salon").id;
	if ((serversData.servers[serverDataInd].welcomeChannel && !message.guild.channels.cache.find(c => c.id === serversData.servers[serverDataInd].welcomeChannel)) || !serversData.servers[serverDataInd].welcomeChannel) {
		serversData.servers[serverDataInd].welcomeChannel = "";
		serversData.servers[serverDataInd].options.welcome = false;
	}
	writeFileSync("ServersData/servers.json", JSON.stringify(serversData));

	message.reply({ content: `Les messages d'accueil sont **${args.getBoolean("état") && serversData.servers[serverDataInd].welcomeChannel ? "activés" : "désactivés"}** ! \n${serversData.servers[serverDataInd].welcomeChannel === "" ? "*⚠️ Il n'y a aucun salon TEXTUEL choisi, ce qui est indispensable pour activer la fonctionnalité*" : `Le salon choisi est <#${serversData.servers[serverDataInd].welcomeChannel}>`}.`, ephemeral: true });
}