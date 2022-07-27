/*
Envoie un message lorsqu'une personne quitte le serveur.
Lien de la vidéo : https://www.youtube.com/watch?v=iJ5QOE8m1i4
*/

/** @format */

const Event = require('../Structures/Event.js');
const Discord = require('discord.js');
const fs = require('fs');

module.exports = new Event('guildMemberRemove', (client, member) => {

	// Accueil
	const channel = member.guild.channels.cache.get('758416588834603009');
	// const channel = member.guild.channels.cache.get('758419452462104617') //Test-bot

	if (!channel) return;

	const linkData = './Data/data.json';
	const fileData = fs.readFileSync(linkData);
	const data = JSON.parse(fileData);

	let nom = member.user.tag;
	nom = nom.substring(0, nom.indexOf('#'));

	const nbr = Math.floor(Math.random() * data.memberRemove.length);
	let msg = data.memberRemove[nbr];
	msg = msg.replace('$name$', `${nom}`);

	const embed = new Discord.MessageEmbed();
	const date = member.joinedAt.toUTCString();

	embed
		.setTitle(msg)
		.setColor('RED')
		// .setThumbnail(member.user.avatarURL({ dynamic: true }))
		.setDescription(`***Serveur rejoint le*** ${date}`)
		.setTimestamp();

	channel.send({ embeds: [embed] });


	const date2 = new Date();
	console.log(`\x1b[90m${date2.getDate()}/${date2.getMonth() + 1} - ${date2.getHours()}:${date2.getMinutes()}\x1b[0m ||\x1b[31m ${member.user.tag} (${member.id}) a quitté le serveur !\x1b[0m`);

	const linkStats = './Data/stats.json';
	const fileStats = fs.readFileSync(linkStats);
	const stats = JSON.parse(fileStats);

	for (let i = 0; i < stats.membres.length; i++) {
		if (member.id == stats.membres[i].id) {
			stats.membres[i].dateQuit = date2.getTime();
			fs.writeFileSync(linkStats, JSON.stringify(stats));
		}
	}

	const memberCount = member.guild.memberCount;
	const channelCount = member.guild.channels.cache.get('808641133655228457');
	channelCount.setName(`Membres : ${memberCount}`);
});
