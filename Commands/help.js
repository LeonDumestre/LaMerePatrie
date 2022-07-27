const Command = require('../Structures/Command');

module.exports = new Command({

	name: 'help',
	description: 'Explique les commandes',
	permission: '',

	async run(bot, message) {
		await message.reply('Commande help');
	},

});