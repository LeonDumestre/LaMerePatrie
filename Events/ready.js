/*
Envoie d'un message dans la console lors du démarrage du BOT
Lien de la vidéo : https://www.youtube.com/watch?v=uE5gEKd2se4
*/

/** @format */

const Event = require('../Structures/Event.js');
const fs = require('fs');
const humanizeDuration = require('humanize-duration');

module.exports = new Event('ready', bot => {

	// Remet à 0 les données de bingo.json
	const bingoTxt = {
		'channelBingo': 0,
		'nombreGagnant': 0,
	};
	const bingo = JSON.stringify(bingoTxt);
	fs.writeFileSync('./Data/bingo.json', bingo);

	bot.user.setStatus('dnd');
	const linkStats = './Data/stats.json';
	let totalGoulag;
	let totalTpsGoulag;
	let hDuration;
	let ind = 0;
	let statuts;

	const shortHumanizer = humanizeDuration.humanizer({
		language: 'shortFr',
		languages: {
			shortFr: { d: () => 'j', h: () => 'h', m: () => 'm', s: () => 's' },
		},
	});

	setInterval(() => {
		const fileStats = fs.readFileSync(linkStats);
		const stats = JSON.parse(fileStats);
		totalGoulag = 0;
		totalTpsGoulag = 0;
		for (let i = 0; i < stats.membres.length; i++) {
			totalGoulag += stats.membres[i].goulag.nbrFoisAllé;
			totalTpsGoulag += stats.membres[i].goulag.tpsPassé;
		}
		hDuration = shortHumanizer(totalTpsGoulag, { largest: 2, maxDecimalPoints: 0 }).replaceAll(',', '');
		statuts = [
			() => `${totalGoulag} envois au goulag`,
			() => `${hDuration} de goulag`,
		];

		bot.user.setActivity(statuts[ind](), { type: 'PLAYING' });
		ind = ++ind % statuts.length;
	}, 15000);

	console.log('\x1b[40m\x1b[33mLa Mère Patrie se réveille pour niquer des mères !\x1b[0m');

	// bot.channels.cache.get('882675052770914305').messages.fetch('882967548260388894')

});
