import { PermissionFlagsBits } from "discord.js";
import { getServerDataInd, getServersData } from "../Tools/global.js";
import { writeFileSync } from "fs";

export const name = "setup-bingo";
export const description = "Active / désactive le bingo";
export const permission = PermissionFlagsBits.Administrator;
export const dm = false;
export const options = [
	{
		type: "boolean",
		name: "état",
		description: "Active / désactive",
		required: true,
	},
];
export async function run(bot, message, args) {

	const serverDataInd = getServerDataInd(message.guild.id);
	const serversData = getServersData();

	serversData.servers[serverDataInd].options.bingo = args.getBoolean("état");
	writeFileSync("ServersData/servers.json", JSON.stringify(serversData));

	message.reply({ content: `Le bingo est **${args.getBoolean("état") ? "activé" : "désactivé"}** ! \n*⚠️ Il est conseillé de choisir les channels où les commandes peuvent être utilisées avec la commande \`/setup-channels\`.*`, ephemeral: true });
}