const Discord = require('discord.js');
const Command = require('../Structures/Command');
const fs = require('fs');

module.exports = new Command({

	name: 'bingo',
	description: 'Choisis un nombre au hasard et attend la bonne réponse',
	permission: '',

	run: async (bot, message) => {

		const idCmdBot = '758324686433812510';
		const idSpam = '783286918527713300';

		const embed = new Discord.MessageEmbed();
		const file = fs.readFileSync('./Data/bingo.json');
		const bingo = JSON.parse(file);

		// écrire le JSON
		if (message.channel.id == idCmdBot || message.channel.id == idSpam) {

			if (bingo.nombreGagnant === 0) {
				const BINGO = {
					'channelBingo': message.channel.id,
					'nombreGagnant': `${Math.floor(Math.random() * (99) + 1)}`,
				};
				const data = JSON.stringify(BINGO);
				fs.writeFileSync('./Data/bingo.json', data);

				// fs.writeFileSync("bingo.json",JSON.stringify(Math.floor(Math.random()*(99)+1)))
				embed.setColor('BLUE').setTitle('🎉 LE BINGO COMMENCE !!! 🎉').setDescription('*Trouve le nombre entre 1 et 100*');
				message.channel.send({ embeds: [embed] });
			}
			else {
				message.reply(`Un bingo est déjà lancé dans <#${bingo.channelBingo}>.`);
			}
		}
		else {
			message.reply(`Tu ne peux pas lancer de bingo dans ce channel ! Va plutôt dans <#${idCmdBot}> ou dans <#${idSpam}>.`);
		}
	},

});
