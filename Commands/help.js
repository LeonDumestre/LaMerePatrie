const Discord = require("discord.js");

module.exports = {

	name: "help",
	description: "Affiche chaque commande avec sa description",
	permission: "",
	dm: false,

	async run(bot, message) {

		const embed = new Discord.EmbedBuilder();
		const commands = bot.commands;
		const adminCmds = [], modCmds = [], commonCmds = [];

		commands.forEach(cmd => {
			switch (cmd.permission) {
			case Discord.PermissionFlagsBits.Administrator:
				adminCmds.push(cmd);
				break;
			case Discord.PermissionFlagsBits.ManageChannels:
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
			.setColor(0xFFF000)
			.addFields({ name: "COMMANDES GENERALES", value: commonField });

		if (message.member.permissions.has(Discord.PermissionFlagsBits.ManageChannels)) {
			let modField = "";
			modCmds.forEach(cmd => modField += `• **${cmd.name}** : ${cmd.description}\n`);
			embed.addFields({ name: "COMMANDES MODERATEUR", value: modField });
		}

		if (message.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) {
			let adminField = "";
			adminCmds.forEach(cmd => adminField += `• **${cmd.name}** : ${cmd.description}\n`);
			embed.addFields({ name: "COMMANDES ADMINISTRATEUR", value: adminField });
		}

		message.reply({ embeds: [embed] });
	},
};