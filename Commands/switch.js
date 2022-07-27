const Command = require('../Structures/Command');

module.exports = new Command({

	name: 'switch',
	description: 'Switch les rôles lorsque qu\'une année passe',
	permission: 'ADMINISTRATOR',

	async run(bot, message) {

		const twoYearRole = message.guild.roles.cache.get('877234419331637359');
		const ancienRole = message.guild.roles.cache.get('781608746467983370');
		// const promoRole = message.guild.roles.cache.get('1001924338611671140');
		const iutRole = message.guild.roles.cache.get('775651545638764564');

		const twoYearMap = twoYearRole.members.map(m => m);

		for (const user of twoYearMap) {
			//     if (!user.roles.cache.get(promoRole.id)) await user.roles.add(promoRole);
			//     if (!user.roles.cache.get(ancienRole.id)) await user.roles.add(ancienRole);
			user.roles.add(iutRole);
		}

		const iutMap = iutRole.members.map(m => m);

		for (const user of iutMap) {
			if (user.roles.cache.get(ancienRole.id)) await user.roles.remove(iutRole);
		}

		await message.reply('Les rôles ont été modifiés.');

	},

});