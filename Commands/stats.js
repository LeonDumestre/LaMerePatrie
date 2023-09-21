const Discord = require("discord.js");
const humanizeDuration = require("humanize-duration");
const { getServerStats } = require("../Tools/global");

module.exports = {

	name: "stats",
	description: "Affiche les statistiques de l'utilisateur",
	permission: "",
	dm: false,
	options: [
		{
			type: "user",
			name: "utilisateur",
			description: "Utilisateur à afficher",
			required: true,
		},
	],

	async run(bot, message, args) {
		const stats = getServerStats(message.guild.id);

		const nbMembers = stats.members.length;
		let memberExist = false, ind;

		const embed = new Discord.EmbedBuilder();
		const user = args.getUser("utilisateur");

		for (let i = 0; i < nbMembers; i++) {
			if (user.id == stats.members[i].id) {
				memberExist = true;
				ind = i;
			}
		}

		const shortHumanizer = humanizeDuration.humanizer({
			language: "shortFr",
			languages: {
				shortFr: { d: () => "j", h: () => "h", m: () => "min", s: () => "s" },
			},
		});
		let ennemi = "", target = "";
		let nbEnnemi = 0, nbTarget = 0;

		if (memberExist) {
			let idEnnemi;
			for (let i = 0; i < stats.members[ind].goulag.ennemis.length; i++) {
				if (stats.members[ind].goulag.ennemis[i].nbr > nbEnnemi) {
					idEnnemi = stats.members[ind].goulag.ennemis[i].id;
					nbEnnemi = stats.members[ind].goulag.ennemis[i].nbr;
				}
			}
			if (nbEnnemi != 0) ennemi = `Ton pire ennemi : <@${idEnnemi}>\n *Il t'a envoyé* ***${nbEnnemi} fois*** *au goulag.*`;

			let idTarget;
			for (let i = 0; i < stats.members[ind].goulag.cibles.length; i++) {
				if (stats.members[ind].goulag.cibles[i].nbr > nbTarget) {
					idTarget = stats.members[ind].goulag.cibles[i].id;
					nbTarget = stats.members[ind].goulag.cibles[i].nbr;
				}
			}
			if (nbTarget != 0) target = `Ta cible préféré : <@${idTarget}>\n *Tu l'as envoyé* ***${nbTarget} fois*** *au goulag.*`;
		}

		let plural = "";
		if (!memberExist || stats.members[ind].winBingo != 1) plural = "s";

		let goulagTime = "0 min";
		if (memberExist && stats.members[ind].goulag.tpsPassé >= 0) goulagTime = shortHumanizer(stats.members[ind].goulag.tpsPassé, { maxDecimalPoints: 0 }).replaceAll(",", "");

		embed.setTitle(`📈 Statistiques de ${user.username} 📈`)
			.setColor("#F79E58")
			.addFields({ name: "\u200B", value: `**Ｂｉｎｇｏ :**ㅤ🎉 ${memberExist ? stats.members[ind].winBingo : "0"} victoire${plural} 🎉` })
			.addFields({ name: "\u200B", value: "**Ｇｏｕｌａｇ :**" })
			.addFields({ name: "⛓️ Aller simple", value: memberExist ? stats.members[ind].goulag.nbrFoisAllé.toString() : "0", inline: true })
			.addFields({ name: "👮 Personnes envoyées", value: memberExist ? stats.members[ind].goulag.nbrFoisEnvoyé.toString() : "0", inline: true })
			.addFields({ name: "⌛ Temps passé", value: goulagTime, inline: true })
			.setThumbnail(user.displayAvatarURL());

		// .addField(`\u200B`, '**Ｅｖｅｎｔ :**')

		// .addField('Retour à l'envoyeur',stats.members[ind].goulag.nbrEvent.auteurEnvoyé.toString(),true)
		// .addField('Temps doublé',stats.members[ind].goulag.nbrEvent.tpsDoublé.toString(),true)
		// .addField('Temps divisé',stats.members[ind].goulag.nbrEvent.tpsDivisé.toString(),true)

		if (memberExist && nbEnnemi != 0) embed.addFields({ name: "\u200B", value: ennemi });
		if (memberExist && nbTarget != 0) embed.addFields({ name: "\u200B", value: target });

		message.reply({ embeds: [embed] });
	},
};