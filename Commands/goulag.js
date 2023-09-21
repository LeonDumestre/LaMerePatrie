const Discord = require('discord.js');
const parseDuration = require('parse-duration');
const humanizeDuration = require('humanize-duration');
const fs = require('fs');
const { getServerDataInd, getServerStats, getMemberStatsInd, getServersData } = require('../Tools/global');

const cooldowns = new Map();
const cooldownsHorloge = new Map();

module.exports = {

	name: "goulag",
	description: "Permet de timeout une personne pour une durée max de 5 minutes",
	permission: "",
	dm: false,
	options: [
        {
            type: "user",
            name: "utilisateur",
            description: "Utilisateur a envoyé au goulag",
            required: true
        },
		{
            type: "number",
            name: "minutes",
            description: "Nombre de minutes entre 1 et 5",
            required: true
        }
	],

	async run(bot, message, args) {
		//return message.reply({ content: "Aïe ! Le Goulag n\'est pas disponible pour le moment...", ephemeral: true });

		const serversData = getServersData();
		const serverDataInd = getServerDataInd(message.guild.id);
		const goulagRole = message.guild.roles.cache.find(role => role.id === serversData.servers[serverDataInd].goulagRole) ? serversData.servers[serverDataInd].goulagRole : false;

		const embed = new Discord.EmbedBuilder();
		let targetMember = message.guild.members.cache.get(args.getUser("utilisateur").id);
		const authorMember = message.member;
		let sendAuthor = false;
		let randNbr = 0;

		// La commande n'est pas lancé si le goulagueur est au goulag
		if (goulagRole && message.member.roles.cache.get(goulagRole)) return message.reply('Tu es au goulag et tu penses avoir des droits ?');

		const minutes = args.getNumber("minutes");
		if (minutes > 5 || minutes <= 0) return message.reply({ content: 'Indique une durée entre 0 et 5', ephemeral: true });
		let duration = parseDuration(minutes + "m");

		// Si le cooldown n'est pas encore écoulé
		const cooldown = cooldowns.get(message.user.id);
		if (cooldown) {
			const remaining = humanizeDuration(cooldown - Date.now(), { units: ['h', 'm', 's'], round: true, delimiter: ' et ', language: 'fr' });
			return message.reply(`Tu dois attendre ${remaining} avant de pouvoir envoyer quelqu'un d'autre au goulag.`).catch(() => {});
		}

		// Si la personne est déjà au goulag (ne peut pas vérifier le timeout même avec targetMember.communicationDisabledUntilTimestamp)
		if ((goulagRole && targetMember.roles.cache.get(goulagRole))) return message.reply('Cette personne est déjà au goulag.');

		// Crée un membre dans data.json s'il n'existe pas
		const indTargetMember = getMemberStatsInd(message.guild.id, targetMember);
		const indAuthorMember = getMemberStatsInd(message.guild.id, authorMember);
		const stats = getServerStats(message.guild.id);
		fs.writeFileSync(`ServersData/Stats/${message.guild.id}.json`, JSON.stringify(stats));

		// Mise en place du cooldown de 30 minutes
		cooldowns.set(message.user.id, Date.now() + 1800000);
		setTimeout(() => cooldowns.delete(message.user.id), 1800000);

		const fileData = fs.readFileSync('./data.json');
		const data = JSON.parse(fileData);
		let time = humanizeDuration(duration, { language: 'fr' });
		let msg = "", msgEvent = "";

		// Si la Mère Patrie est envoyé au goulag
		if (targetMember == message.guild.members.cache.get(message.client.user.id)) {
			targetMember = authorMember;
			await message.channel.send('https://tenor.com/view/uno-reverse-card-funny-uno-reverse-card-gif-17246642');
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
					stats.members[indAuthorMember].goulag.nbrEvent.auteurEnvoyé++;
				}
				break;
			case 2:
				duration = duration * 2;
				time = humanizeDuration(duration, { language: 'fr' });
				msgEvent = data.goulag.event[1];
				stats.members[indTargetMember].goulag.nbrEvent.tpsDoublé++;
				break;
			case 3:
				duration = duration / 2;
				time = humanizeDuration(duration, { language: 'fr' });
				msgEvent = data.goulag.event[2];
				stats.members[indTargetMember].goulag.nbrEvent.tpsDivisé++;
				break;
			}

			// Choix random et envoi du message d'envoi au goulag
			randNbr = Math.floor(Math.random() * data.goulag.envoi.length);
			msg = data.goulag.envoi[randNbr];
			// if (targetMember.user.id == authorMember.id) msg = 'Le sadomaso ' + msg;
		}

		msg = msg + '\n' + msgEvent;
		msg = msg.replace('$name$', `${targetMember}`);
		msg = msg.replace('$name_$', `${authorMember}`);
		msg = msg.replace('$time$', `**${time}**`);

		// Envoi du message d'envoi au goulag et gestion de l'horloge du footer
		cooldownsHorloge.set(targetMember.id, Date.now() + duration);
		let timeLeft = cooldownsHorloge.get(targetMember.id) - Date.now();

		embed
			.setColor(0x000000)
			.setDescription(msg)
			.setFooter({ text: 'Il reste : ' + humanizeDuration(timeLeft, { round: true }, { language: 'fr' }) });
		await message.reply({ embeds: [embed] });

		const interval = setInterval(() => {
			timeLeft = cooldownsHorloge.get(targetMember.id) - Date.now();
			if (timeLeft > 1000) embed.setFooter({ text: 'Il reste : ' + humanizeDuration(timeLeft, { round: true }, { language: 'fr' }) });
			else embed.setFooter({ text: ' ' });
			message.editReply({ embeds: [embed] });
		}, 1000);


		// Envoi au goulag
		try {
			if (goulagRole && !targetMember.permissions.has(Discord.PermissionFlagsBits.Administrator) && !targetMember.roles.cache.some(r => r == goulagRole)) await targetMember.roles.add(goulagRole);
		} catch (error) {console.log(error)};
		try {
			if (!targetMember.permissions.has(Discord.PermissionFlagsBits.Administrator)) targetMember.timeout(duration);
		} catch (error) {console.log(error)};

		stats.members[indTargetMember].goulag.nbrFoisAllé++;
		stats.members[indAuthorMember].goulag.nbrFoisEnvoyé++;
		stats.members[indTargetMember].goulag.tpsPassé += duration;

		let ennemiExist = false;
		for (let i = 0; i < stats.members[indTargetMember].goulag.ennemis.length; i++) {
			if (authorMember.id == stats.members[indTargetMember].goulag.ennemis[i].id) {
				stats.members[indTargetMember].goulag.ennemis[i].nbr++;
				ennemiExist = true;
			}
		}
		if (!ennemiExist) {
			const ennemi = { 'id': authorMember.id, 'nbr': 1 };
			stats.members[indTargetMember].goulag.ennemis.push(ennemi);
		}
		if (sendAuthor) {
			try {
				if (goulagRole) await authorMember.roles.add(goulagRole);
			} catch (error) {console.log(error)};
			try {
				if (!authorMember.permissions.has(Discord.PermissionFlagsBits.Administrator)) authorMember.timeout(duration);
			} catch (error) {console.log(error)};
			stats.members[indAuthorMember].goulag.nbrFoisAllé++;
			stats.members[indAuthorMember].goulag.tpsPassé += duration;
		}

		let targetExist = false;
		for (let i = 0; i < stats.members[indAuthorMember].goulag.cibles.length; i++) {
			if (targetMember.id == stats.members[indAuthorMember].goulag.cibles[i].id) {
				stats.members[indAuthorMember].goulag.cibles[i].nbr++;
				targetExist = true;
			}
		}
		if (!targetExist) {
			const target = { 'id': targetMember.id, 'nbr': 1 };
			stats.members[indAuthorMember].goulag.cibles.push(target);
		}
		fs.writeFileSync(`ServersData/Stats/${message.guild.id}.json`, JSON.stringify(stats));
		
		// Retour du goulag
		setTimeout(() => {
			if (targetMember.deleted) return;
			try {
				if (goulagRole) targetMember.roles.remove(goulagRole);
			} catch (error) {console.log(error)};
			cooldownsHorloge.delete(targetMember.id);
			clearInterval(interval);
			if (sendAuthor) {
				if (authorMember.deleted) return;
				try {
					if (goulagRole) authorMember.roles.remove(goulagRole);
				} catch (error) {console.log(error)};
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

			embed.setColor(0x389738).setDescription(msg).setFooter({ text: ' ' })
			message.channel.send({ embeds: [embed] });

		}, duration);

	}
}