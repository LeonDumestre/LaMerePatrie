const Discord = require("discord.js");

module.exports = {

	name: "clear",
	description: "Supprime un nombre de messages défini",
	permission: Discord.PermissionFlagsBits.ManageChannels,
	dm: false,
	options: [
		{
			type: "number",
			name: "nombre",
			description: "Nombre de messages à supprimer",
			required: true,
		},
	],

	async run(bot, message, args) {

		const number = args.getNumber("nombre");
		if (number <= 0) return message.reply({ content: "Le nombre doit être supérieur à 0 !", ephemeral: true });
		if (number > 50) return message.reply({ content: "Tu ne peux pas effacer plus de 50 messages !", ephemeral: true });

		await message.channel.bulkDelete(number)
			.then(() => {
				if (number > 1) message.reply({ content: `${number} messages effacés !`, ephemeral: true });
				else message.reply({ content: `${number} message effacé !`, ephemeral: true });
			})
			.catch(() => { return message.reply({ content: "Ces messages ne peuvent pas être effacés !", ephemeral: true }); });
	},
};