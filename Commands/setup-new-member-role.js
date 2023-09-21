import { PermissionFlagsBits } from "discord.js";
import { getServerDataInd, getServersData } from "../Tools/global.js";
import { writeFileSync } from "fs";

export const name = "setup-new-member-role";
export const description = "Choisis un role à attribuer aux nouveaux membres";
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
		description: "Rôle à attribuer",
		required: false,
	},
];
export async function run(bot, message, args) {

	const serverDataInd = getServerDataInd(message.guild.id);
	const serversData = getServersData();

	serversData.servers[serverDataInd].options.newMemberRole = args.getBoolean("état");
	if (args.getRole("role")) serversData.servers[serverDataInd].newMemberRole = args.getRole("role").id;
	if ((serversData.servers[serverDataInd].newMemberRole && !message.guild.roles.cache.find(r => r.id === serversData.servers[serverDataInd].newMemberRole)) || !serversData.servers[serverDataInd].newMemberRole) {
		serversData.servers[serverDataInd].newMemberRole = "";
		serversData.servers[serverDataInd].options.newMemberRole = false;
	}
	writeFileSync("ServersData/servers.json", JSON.stringify(serversData));

	message.reply({ content: `L'attribution d'un rôle aux nouveaux membres est **${args.getBoolean("état") && serversData.servers[serverDataInd].newMemberRole ? "activé" : "désactivé"}** ! \n${serversData.servers[serverDataInd].newMemberRole === "" ? "*⚠️ Il n'y a aucun rôle choisi, ce qui est indispensable pour activer la fonctionnalité*" : `Le rôle choisi est <@&${serversData.servers[serverDataInd].newMemberRole}>`}.`, ephemeral: true });
}