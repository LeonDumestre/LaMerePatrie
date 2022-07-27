const Command = require('../Structures/Command');
const Discord = require('discord.js');

module.exports = new Command({

	name: 'ungoulag',
	description: 'Retire le rôle goulag',
	permission: 'ADMINISTRATOR',

	async run(bot, message) {

		if (!message.member.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)) return message.reply('Tu n\'as pas la permission d\'utiliser cette commande !');

		const member = message.mentions.members.first();
		if (!member) return;

		member.roles.remove('764953822535221248');
	},

});
