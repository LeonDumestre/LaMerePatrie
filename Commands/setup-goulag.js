import { PermissionFlagsBits } from "discord.js";
import { getServerDataInd, getServersData } from "../Tools/global.js";
import { writeFileSync } from "fs";

export const name = "setup-goulag";
export const description = "Active / désactive le goulag et choisis un rôle à attribuer (pas obligatoire)";
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
		type: "role",
		name: "role",
		description: "Rôle Goulag",
		required: false,
	},
];
export async function run(bot, message, args) {

	const serverDataInd = getServerDataInd(message.guild.id);
	const serversData = getServersData();

	serversData.servers[serverDataInd].options.goulag = args.getBoolean("état");
	if (args.getRole("role")) serversData.servers[serverDataInd].goulagRole = args.getRole("role").id;
	if (serversData.servers[serverDataInd].goulagRole && !message.guild.roles.cache.find(r => r.id === serversData.servers[serverDataInd].goulagRole)) serversData.servers[serverDataInd].goulagRole = "";
	writeFileSync("ServersData/servers.json", JSON.stringify(serversData));

	message.reply({ content: `Le goulag est **${args.getBoolean("état") ? "activé" : "désactivé"}** ! \n${serversData.servers[serverDataInd].goulagRole === "" ? "Il n'y a aucun rôle attribué au goulag" : `Le rôle attribué est <@&${serversData.servers[serverDataInd].goulagRole}>`}.`, ephemeral: true });
}