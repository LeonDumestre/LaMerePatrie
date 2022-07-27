const Discord = require('discord.js');
const Command = require('../Structures/Command');
const fs = require('fs');
const humanizeDuration = require('humanize-duration');

module.exports = new Command({

	name: 'stats',
	description: '',
	permission: 'Aucune',

	async run(bot, message, args) {


		const idCmdBot = '758324686433812510';
		const idSpam = '783286918527713300';
		const idTestBot = '758419452462104617';

		if (message.channel.id != idCmdBot && message.channel.id != idSpam && message.channel.id != idTestBot) return message.reply(`Tu ne peux pas afficher tes stats dans ce channel ! Va plutôt dans <#${idCmdBot}> ou dans <#${idSpam}>.`);

		const link = './Data/stats.json';
		const file = fs.readFileSync(link);
		const stats = JSON.parse(file);

		const nbMembers = stats.membres.length;
		let memberExist = false;
		let ind;

		const embed = new Discord.MessageEmbed();

		let id, nom;
		let mention;
		if (!args[1]) {
			id = message.member.id;
			nom = message.author.tag;
			mention = message.member;
		}
		else {
			mention = message.mentions.members.first();
			if (mention) {
				id = mention.id;
				nom = mention.user.tag;
			}
			else {
				return message.reply('Mentionne le camarade à inspecter.');
			}
		}

		for (let i = 0; i < nbMembers; i++) {
			if (id == stats.membres[i].id) {
				memberExist = true;
				ind = i;
			}
		}


		nom = nom.substring(0, nom.indexOf('#'));

		let ennemi = '', target = '';
		let nbEnnemi = 0, nbTarget = 0;
		if (memberExist) {
			let idEnnemi;
			for (let i = 0; i < stats.membres[ind].goulag.ennemis.length; i++) {
				if (stats.membres[ind].goulag.ennemis[i].nbr > nbEnnemi) {
					idEnnemi = stats.membres[ind].goulag.ennemis[i].id;
					nbEnnemi = stats.membres[ind].goulag.ennemis[i].nbr;
				}
			}
			if (nbEnnemi != 0) ennemi = `Ton pire ennemi : <@${idEnnemi}>\n *Il t'a envoyé* ***${nbEnnemi} fois*** *au goulag.*`;

			let idTarget;
			for (let i = 0; i < stats.membres[ind].goulag.cibles.length; i++) {
				if (stats.membres[ind].goulag.cibles[i].nbr > nbTarget) {
					idTarget = stats.membres[ind].goulag.cibles[i].id;
					nbTarget = stats.membres[ind].goulag.cibles[i].nbr;
				}
			}
			if (nbTarget != 0) target = `Ta cible préféré : <@${idTarget}>\n *Tu l'as envoyé* ***${nbTarget} fois*** *au goulag.*`;

			const shortHumanizer = humanizeDuration.humanizer({
				language: 'shortFr',
				languages: {
					shortFr: { d: () => 'j', h: () => 'h', m: () => 'min', s: () => 'sec' },
				},
			});

			const tpsGoulag = shortHumanizer(stats.membres[ind].goulag.tpsPassé, { maxDecimalPoints: 0 }).replaceAll(',', '');

			let plural = '';
			if (stats.membres[ind].winBingo != 1) plural = 's';

			embed.setTitle(`📈 Statistiques de ${nom} 📈`)
				.setColor('#F79E58')
				.addField('\u200B', `**Ｂｉｎｇｏ :**ㅤ🎉 ${stats.membres[ind].winBingo} victoire${plural} 🎉`)
				// .addField(`🎉 Victoires`,stats.membres[ind].winBingo.toString(),false)

				.addField('\u200B', '**Ｇｏｕｌａｇ :**')

				.addField('⛓️ Aller simple', stats.membres[ind].goulag.nbrFoisAllé.toString(), true)
				.addField('👮 Personnes envoyées', stats.membres[ind].goulag.nbrFoisEnvoyé.toString(), true)
				.addField('⌛ Temps passé', tpsGoulag, true);

			// .addField(`\u200B`, '**Ｅｖｅｎｔ :**')

			// .addField('Retour à l'envoyeur',stats.membres[ind].goulag.nbrEvent.auteurEnvoyé.toString(),true)
			// .addField('Temps doublé',stats.membres[ind].goulag.nbrEvent.tpsDoublé.toString(),true)
			// .addField('Temps divisé',stats.membres[ind].goulag.nbrEvent.tpsDivisé.toString(),true)

			if (nbEnnemi != 0) embed.addField('\u200B', ennemi);
			if (nbTarget != 0) embed.addField('\u200B', target);

			embed.setThumbnail(mention.user.displayAvatarURL());
		}
		else {
			embed.setTitle(`📈 Statistiques de ${nom} 📈`)
				.setColor('#F79E58')
				.addField('\u200B', '**Ｂｉｎｇｏ :**ㅤ🎉 0 victoires 🎉')

				.addField('\u200B', '**Ｇｏｕｌａｇ :**')

				.addField('⛓️ Aller simple', '0', true)
				.addField('👮 Personne envoyé', '0', true)
				.addField('⌛ Temps passé', '0 sec', true)
				.setThumbnail(mention.user.displayAvatarURL());
		}
		message.reply({ embeds: [embed] });

	},
});