// Event de vérification des messages de la commande Bingo

/** @format */

const Event = require('../Structures/Event.js');
const fs = require('fs');
const Discord = require('discord.js');

let time, delay;

module.exports = new Event('messageCreate', (bot, message) => {

	if (message.author.bot) return;

	const embed = new Discord.MessageEmbed();
	let file = fs.readFileSync('./Data/bingo.json');
	let bingo = JSON.parse(file);

	if (bingo.nombreGagnant !== 0 && message.channel.id === bingo.channelBingo) {
		const member = message.member;

		// cooldown bingo
		const myVar = setInterval(function() {
			file = fs.readFileSync('./Data/bingo.json');
			bingo = JSON.parse(file);
			if (bingo.nombreGagnant !== 0) {
				if (!time) {
					delay = Date.now() + 300000;
					time = true;
				}
				if (Date.now() >= delay) {
					embed.setColor('Black').setTitle('\u26A0\uFE0F Le temps est écoulé, le 🎉 Bingo 🎉 est fini !').setDescription(`*Le nombre gagnant était : ${bingo.nombreGagnant}*`);
					bot.channels.cache.get(bingo.channelBingo).send({ embeds: [embed] });
					const bingoTxt = {
						'channelBingo': 0,
						'nombreGagnant': 0,
					};
					const data = JSON.stringify(bingoTxt);
					fs.writeFileSync('./Data/bingo.json', data);
					time = false;
					clearInterval(myVar);
				}
			}
		}, 1000);

		if (message.content === bingo.nombreGagnant) {
			embed.setColor('GREEN').setDescription(`🎉 **BRAVO** ${member} 🎉 Tu as **gagné** !!! 🎊 \n *Le nombre gagnant était : ${bingo.nombreGagnant}*`);
			bot.channels.cache.get(bingo.channelBingo).send({ embeds: [embed] });
			const bingoTxt = {
				'channelBingo': 0,
				'nombreGagnant': 0,
			};
			const data = JSON.stringify(bingoTxt);
			fs.writeFileSync('./Data/bingo.json', data);
			time = false;


			// Crée un membre et compléte winBingo
			const link = './Data/stats.json';
			file = fs.readFileSync(link);
			const stats = JSON.parse(file);
			const nbMembers = stats.membres.length;
			let membreExist = false;
			let ind;

			for (let i = 0; i < nbMembers; i++) {
				if (message.member.id == stats.membres[i].id) {
					membreExist = true;
					ind = i;
				}
			}

			if (!membreExist) {
				const newMember = {
					'id': message.member.id,
					'winBingo': 1,
					'goulag': {
						'nbrFoisAllé': 0,
						'nbrFoisEnvoyé': 0,
						'tpsPassé': 0,
						'nbrEvent': {
							'auteurEnvoyé': 0,
							'tpsDoublé': 0,
							'tpsDivisé': 0,
						},
						'ennemis': [],
						'cibles': [],
					},
					'dateQuit': 0,
				};

				stats.membres.push(newMember);
				fs.writeFileSync(link, JSON.stringify(stats));
				const date = new Date();
				console.log(`\x1b[90m${date.getDate()}/${date.getMonth() + 1} - ${date.getHours()}:${date.getMinutes()}\x1b[0m ||\x1b[36m ${message.author.username} (${message.member.id}) a été ajouté à la base de données.\x1b[0m`);
			}
			else {
				stats.membres[ind].winBingo++;
				fs.writeFileSync(link, JSON.stringify(stats));
			}

		}
	}
});
