const Command = require('../Structures/Command');
const Discord = require('discord.js');
const parseDuration = require('parse-duration');
const humanizeDuration = require('humanize-duration');

const cooldownsHorloge = new Map();


module.exports = new Command({

	name: 'avertissement',
	description: 'Permet de goulag de façon illimité pour avertissement',
	permission: 'ADMINISTRATOR',


	async run(bot, message, args) {

		if (!message.member.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)) return message.reply('Tu n\'as pas la permission d\'utiliser cette commande !');

		const muteRole = message.guild.roles.cache.get('764953822535221248');
		const modoRole = message.guild.roles.cache.get('757923147121950813');
		// const channel = message.guild.channels.cache.get('887723584494116865')
		const embed = new Discord.MessageEmbed();
		const authorMember = message.member;
		let modoTargetMember = false;
		let modoAuthorMember = false;
		const sendAuthor = false;
		let msg = '';

		// La commande n'est pas lancé si la commande est incomplète
		const targetMember = message.mentions.members.first();
		if (!targetMember) {
			// const { size } = await message.channel.bulkDelete(Number(1), true);
			return message.reply('Mentionne le camarade à avertir');
			// .then(sent => sent.delete({timeout: 5000}))
		}
		let duration = parseDuration(args[2]);
		if (!duration || (!args[2].endsWith('m') && !args[2].endsWith('s'))) {
			return message.reply('Indique une durée valide (ex : 10s, 2m10s ou 1h).');
		}
		const inf = duration % 1000;
		duration = duration - inf;

		// Si la personne est déjà au goulag
		if (targetMember.roles.cache.get('764953822535221248')) {
			return message.reply('Cette personne est déjà au goulag.');
		}

		let msgRaison = '';
		for (let i = 3; i < args.length; i++) {
			msgRaison += args[i] + ' ';
		}
		const time = humanizeDuration(duration, { language: 'fr' });

		msg = `${targetMember} tu as été puni pour **${time}**\n\n Raison : **${msgRaison}**`;


		// Envoi du message d'envoie et gestion de l'horologe du footer
		cooldownsHorloge.set(targetMember.id, Date.now() + duration);
		let tempsRestant = cooldownsHorloge.get(targetMember.id) - Date.now();

		embed.setColor('YELLOW').setTitle(' AVERTISSEMENT ⚠️').setDescription(msg).setFooter('Il reste : ' + humanizeDuration(tempsRestant, { round: true }, { language: 'fr' }));
		const msgSend = await message.reply({ embeds: [embed] });

		const interval = setInterval(() => {
			tempsRestant = cooldownsHorloge.get(targetMember.id) - Date.now();
			if (tempsRestant > 0) embed.setFooter('Il reste : ' + humanizeDuration(tempsRestant, { round: true }, { language: 'fr' }));
			else embed.setFooter('');
			msgSend.edit({ embeds: [embed] });
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


		if (sendAuthor) {
			await authorMember.roles.add(muteRole);
			if (authorMember.voice.channel) authorMember.voice.setMute(true);
		}


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
			embed.setColor('GREEN').setTitle('').setDescription(`${targetMember}, ta punition est fini`).setFooter('');
			message.channel.send({ embeds: [embed] });

		}, duration);

	},
});
