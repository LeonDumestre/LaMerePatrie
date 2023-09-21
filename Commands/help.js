import { EmbedBuilder, PermissionFlagsBits } from "discord.js";

export const name = "help";
export const description = "Affiche chaque commande avec sa description";
export const permission = "";
export const dm = false;
export async function run(bot, message) {

	const embed = new EmbedBuilder();
	const commands = bot.commands;
	const adminCmds = [], modCmds = [], commonCmds = [];

	commands.forEach(cmd => {
		switch (cmd.permission) {
			case PermissionFlagsBits.Administrator:
				adminCmds.push(cmd);
				break;
			case PermissionFlagsBits.ManageChannels:
				modCmds.push(cmd);
				break;
			case "":
				commonCmds.push(cmd);
				break;
		}
	});

	let commonField = "";
	commonCmds.forEach(cmd => commonField += `• **${cmd.name}** : ${cmd.description}\n`);

	embed.setTitle("❓ Help ❓")
		.setColor(16773120)
		.addFields({ name: "COMMANDES GENERALES", value: commonField });

	if (message.member.permissions.has(PermissionFlagsBits.ManageChannels)) {
		let modField = "";
		modCmds.forEach(cmd => modField += `• **${cmd.name}** : ${cmd.description}\n`);
		embed.addFields({ name: "COMMANDES MODERATEUR", value: modField });
	}

	if (message.member.permissions.has(PermissionFlagsBits.Administrator)) {
		let adminField = "";
		adminCmds.forEach(cmd => adminField += `• **${cmd.name}** : ${cmd.description}\n`);
		embed.addFields({ name: "COMMANDES ADMINISTRATEUR", value: adminField });
	}

	message.reply({ embeds: [embed] });
}