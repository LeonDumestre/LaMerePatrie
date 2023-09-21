const Discord = require("discord.js");

module.exports = {

	name: "msg",
	description: "Le message est renvoyé par le BOT",
	permission: Discord.PermissionFlagsBits.Administrator,
	dm: false,
	options: [
		{
			type: "string",
			name: "message",
			description: "Message à envoyer",
			required: true,
		},
	],

	async run(bot, message, args) {

		await message.reply({ content: "Le message a bien été envoyé !", ephemeral: true });
		await message.channel.send(args.getString("message"));
	},
};
