const Command = require('../Structures/Command');
const Discord = require('discord.js');
const parseDuration = require('parse-duration');
const humanizeDuration = require('humanize-duration');
const fs = require('fs');

const cooldowns = new Map();
const cooldownsHorloge = new Map();


module.exports = new Command({

	name: 'goulag',
	description: 'Permet de mute vocal et écrit qqun pour une durée max de 5min',
	permission: '',


	async run(bot, message, args) {

		const muteRole = message.guild.roles.cache.get('764953822535221248');
		const modoRole = message.guild.roles.cache.get('757923147121950813');
		// const channel = message.guild.channels.cache.get('887723584494116865')
		const embed = new Discord.MessageEmbed();
		const authorMember = message.member;
		let targetMember;
		let modoTargetMember = false;
		let modoAuthorMember = false;
		let sendAuthor = false;
		let randNbr = 0;
		let msg = '';
		let msgEvent = '';

		// La commande n'est pas lancé si le goulagueur est au goulag
		if (message.member.roles.cache.get('764953822535221248')) {
			return message.reply('Tu es au goulag !');
		}

		// Si la commande est incomplète
		targetMember = message.mentions.members.first();
		if (!targetMember) {
			// const { size } = await message.channel.bulkDelete(Number(1), true);
			return message.reply('Mentionne le camarade à envoyer au goulag.');
			// .then(sent => sent.delete({timeout: 5000}))
		}
		let duration = parseDuration(args[2]);
		if (!duration || (!args[2].endsWith('m') && !args[2].endsWith('s'))) {
			return message.reply('Indique une durée valide inférieure à 5 minutes (ex : 10s, 2m10s ou 4m).');
		}
		if (duration >= 300001 || duration < 0) {
			return message.reply('Indique une durée inférieure à 5 minutes.');
		}
		const inf = duration % 1000;
		duration = duration - inf;

		// Si le cooldown n'est pas encore écoulé
		const cooldown = cooldowns.get(message.author.id);
		if (cooldown) {
			const remaining = humanizeDuration(cooldown - Date.now(), { units: ['h', 'm', 's'], round: true, delimiter: ' et ', language: 'fr' });
			return message.reply(`Tu dois attendre ${remaining} avant de pouvoir envoyer quelqu'un d'autre au goulag.`)
				.catch(console.error);
		}

		// Si la personne est déjà au goulag
		if (targetMember.roles.cache.get('764953822535221248')) {
			return message.reply('Cette personne est déjà au goulag.');
		}


		// Crée un membre dans data.json s'il n'existe pas
		const linkStats = './Data/stats.json';
		const fileStats = fs.readFileSync(linkStats);
		const stats = JSON.parse(fileStats);
		const nbrMembers = stats.membres.length;
		let targetMemberExist = false;
		let authorMemberExist = false;
		let indTargetMember, indAuthorMember;

		for (let i = 0; i < nbrMembers; i++) {
			if (targetMember.id == stats.membres[i].id) {
				targetMemberExist = true;
				indTargetMember = i;
			}
			if (authorMember.id == stats.membres[i].id) {
				authorMemberExist = true;
				indAuthorMember = i;
			}
		}

		if (!targetMemberExist || !authorMemberExist) {
			const date = new Date();
			if (!targetMemberExist) {
				indTargetMember = stats.membres.length;
				const newtargetMember = { 'id': targetMember.id, 'winBingo': 0, 'goulag': { 'nbrFoisAllé': 0, 'nbrFoisEnvoyé': 0, 'tpsPassé': 0, 'nbrEvent': { 'auteurEnvoyé': 0, 'tpsDoublé': 0, 'tpsDivisé': 0 }, 'ennemis': [], 'cibles': [] }, 'dateQuit': 0 };
				stats.membres.push(newtargetMember);
				console.log(`\x1b[90m${date.getDate()}/${date.getMonth() + 1} - ${date.getHours()}:${date.getMinutes()}\x1b[0m ||\x1b[36m ${targetMember.user.tag} (${targetMember.id}) a été ajouté à la base de données.\x1b[0m`);
			}
			if (!authorMemberExist && targetMember.id != authorMember.id) {
				indAuthorMember = stats.membres.length;
				const newMembre2 = { 'id': authorMember.id, 'winBingo': 0, 'goulag': { 'nbrFoisAllé': 0, 'nbrFoisEnvoyé': 0, 'tpsPassé': 0, 'nbrEvent': { 'auteurEnvoyé': 0, 'tpsDoublé': 0, 'tpsDivisé': 0 }, 'ennemis': [], 'cibles': [] }, 'dateQuit': 0 };
				stats.membres.push(newMembre2);
				console.log(`\x1b[90m${date.getDate()}/${date.getMonth() + 1} - ${date.getHours()}:${date.getMinutes()}\x1b[0m ||\x1b[36m ${authorMember.user.tag} (${authorMember.id}) a été ajouté à la base de données.\x1b[0m`);
			}
			if (!authorMemberExist && targetMember.id == authorMember.id) {
				indAuthorMember = indTargetMember;
			}
			fs.writeFileSync(linkStats, JSON.stringify(stats));
		}


		// Mise en place du cooldown de 1h
		cooldowns.set(message.author.id, Date.now() + 3600000);
		setTimeout(() => cooldowns.delete(message.author.id), 3600000);

		const linkData = './Data/data.json';
		const fileData = fs.readFileSync(linkData);
		const data = JSON.parse(fileData);
		let time = humanizeDuration(duration, { language: 'fr' });

		// Si la Mère Patrie est envoyé au goulag
		if (targetMember == message.guild.members.cache.get('758386655626526820')) {
			targetMember = authorMember;
			// nom = targetMember.user.tag
			message.reply('https://tenor.com/view/uno-reverse-card-funny-uno-reverse-card-gif-17246642');
			msg = data.goulag.envoi[0];
		}

		else {

			// Evenement aléatoire
			randNbr = Math.floor(Math.random() * 20);
			switch (randNbr) {
			case 0:
			case 1:
				if (targetMember.user.id != authorMember.id) {
					sendAuthor = true;
					msgEvent = data.goulag.event[0];
					stats.membres[indAuthorMember].goulag.nbrEvent.auteurEnvoyé++;
				}
				break;
			case 2:
				duration = duration * 2;
				time = humanizeDuration(duration, { language: 'fr' });
				msgEvent = data.goulag.event[1];
				stats.membres[indTargetMember].goulag.nbrEvent.tpsDoublé++;
				break;
			case 3:
				duration = duration / 2;
				time = humanizeDuration(duration, { language: 'fr' });
				msgEvent = data.goulag.event[2];
				stats.membres[indTargetMember].goulag.nbrEvent.tpsDivisé++;
				break;
			}

			// Choix random et envoi du message d'envoi au goulag
			randNbr = Math.floor(Math.random() * data.goulag.envoi.length);
			msg = data.goulag.envoi[randNbr];
			if (targetMember.user.id == authorMember.id) msg = 'Le sadomaso ' + msg;
		}

		msg = msg + '\n' + msgEvent;
		msg = msg.replace('$name$', `${targetMember}`);
		msg = msg.replace('$name_$', `${authorMember}`);
		msg = msg.replace('$time$', `**${time}**`);

		// Envoi du message d'envoie et gestion de l'horologe du footer
		cooldownsHorloge.set(targetMember.id, Date.now() + duration);
		let tempsRestant = cooldownsHorloge.get(targetMember.id) - Date.now();

		embed.setColor('BLACK').setDescription(msg).setFooter('Il reste : ' + humanizeDuration(tempsRestant, { round: true }, { language: 'fr' }));
		const msgSend = await message.reply({ embeds: [embed] });

		const interval = setInterval(() => {
			tempsRestant = cooldownsHorloge.get(targetMember.id) - Date.now();
			if (tempsRestant > 0) {
				embed.setFooter('Il reste : ' + humanizeDuration(tempsRestant, { round: true }, { language: 'fr' }));
			}
			else {
				embed.setFooter('');
				msgSend.edit({ embeds: [embed] });
			}
		}, 5000);


		// Si un modoTargetMember est envoyé au goulag
		if (targetMember.roles.cache.get(modoRole.id)) {
			modoTargetMember = true;
			targetMember.roles.remove(modoRole);
		}
		if (authorMember.roles.cache.get(modoRole.id) && sendAuthor) {
			modoAuthorMember = true;
			authorMember.roles.remove(modoRole);
		}


		// Envoi au goulag
		await targetMember.roles.add(muteRole);
		if (targetMember.voice.channel) targetMember.voice.setMute(true);

		stats.membres[indTargetMember].goulag.nbrFoisAllé++;
		stats.membres[indAuthorMember].goulag.nbrFoisEnvoyé++;
		stats.membres[indTargetMember].goulag.tpsPassé += duration;

		let ennemiExiste = false;
		for (let i = 0; i < stats.membres[indTargetMember].goulag.ennemis.length; i++) {
			if (authorMember.id == stats.membres[indTargetMember].goulag.ennemis[i].id) {
				stats.membres[indTargetMember].goulag.ennemis[i].nbr++;
				ennemiExiste = true;
			}
		}
		if (!ennemiExiste) {
			const ennemi = { 'id': authorMember.id, 'nbr': 1 };
			stats.membres[indTargetMember].goulag.ennemis.push(ennemi);
		}

		if (sendAuthor) {
			await authorMember.roles.add(muteRole);
			if (authorMember.voice.channel) authorMember.voice.setMute(true);

			stats.membres[indAuthorMember].goulag.nbrFoisAllé++;
			stats.membres[indAuthorMember].goulag.tpsPassé += duration;
		}

		let targetExist = false;
		for (let i = 0; i < stats.membres[indAuthorMember].goulag.cibles.length; i++) {
			if (targetMember.id == stats.membres[indAuthorMember].goulag.cibles[i].id) {
				stats.membres[indAuthorMember].goulag.cibles[i].nbr++;
				targetExist = true;
			}
		}
		if (!targetExist) {
			const target = { 'id': targetMember.id, 'nbr': 1 };
			stats.membres[indAuthorMember].goulag.cibles.push(target);
		}

		fs.writeFileSync(linkStats, JSON.stringify(stats));


		// Retour du goulag
		setTimeout(() => {
			if (targetMember.deleted) return;
			targetMember.roles.remove(muteRole);
			if (targetMember.voice.channel) targetMember.voice.setMute(false);
			if (modoTargetMember) targetMember.roles.add(modoRole);

			cooldownsHorloge.delete(targetMember.id);
			clearInterval(interval);

			if (sendAuthor) {
				if (authorMember.deleted) return;
				authorMember.roles.remove(muteRole);
				if (authorMember.voice.channel) authorMember.voice.setMute(false);
				if (modoAuthorMember) authorMember.roles.add(modoRole);
			}

			// Choix random et envoi du message de retour du goulag
			if (!sendAuthor) {
				randNbr = Math.floor(Math.random() * data.goulag.retour.solo.length);
				msg = data.goulag.retour.solo[randNbr];
			}
			else {
				randNbr = Math.floor(Math.random() * data.goulag.retour.duo.length);
				msg = data.goulag.retour.duo[randNbr];
				msg = msg.replace('$name_$', `${authorMember}`);
			}
			msg = msg.replace('$name$', `${targetMember}`);
			msg = msg.replace('$time$', `**${time}**`);

			embed.setColor('GREEN').setDescription(msg).setFooter('');
			message.channel.send({ embeds: [embed] });

		}, duration);

	},
});