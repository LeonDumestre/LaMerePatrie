/*
Envoie un message lorsqu'une personne quitte le serveur.
Lien de la vidéo : https://www.youtube.com/watch?v=iJ5QOE8m1i4
*/

/** @format */

const Event = require("../Structures/Event.js");
const Discord = require("discord.js");
const fs = require('fs')

module.exports = new Event("guildMemberRemove", (client, member) => {

	const channel = member.guild.channels.cache.get('758416588834603009') //Accueil
	//const channel = member.guild.channels.cache.get('758419452462104617') //Test-bot

	if (!channel) return;

	let linkData = './Data/data.json'
    let fileData =  fs.readFileSync(linkData)
    let data = JSON.parse(fileData)

	let nom = member.user.tag
	nom = nom.substring(0, nom.indexOf('#'))

	const nbr = Math.floor(Math.random() * data.memberRemove.length)
	let msg = data.memberRemove[nbr]
	msg = msg.replace('$name$', `${nom}`)

	const embed = new Discord.MessageEmbed();
	const date = member.joinedAt.toUTCString()

	embed
		.setTitle(msg)
		.setColor("RED")
		//.setThumbnail(member.user.avatarURL({ dynamic: true }))
		.setDescription(`***Serveur rejoint le*** ${date}`)
		.setTimestamp();

	channel.send({ embeds: [embed] });


	let ladate = new Date()
	console.log(`\x1b[90m${ladate.getDate()}/${ladate.getMonth() + 1} - ${ladate.getHours()}:${ladate.getMinutes()}\x1b[0m ||\x1b[31m ${member.user.tag} (${member.id}) a quitté le serveur !\x1b[0m`)

	let linkStats = './Data/stats.json'
    let fileStats =  fs.readFileSync(linkStats)
    let stats = JSON.parse(fileStats)

	for (let i = 0; i < stats.membres.length; i++) {
		if (member.id == stats.membres[i].id) {
			stats.membres[i].dateQuit = ladate.getTime()
			fs.writeFileSync(linkStats, JSON.stringify(stats))
		}
	}

	let memberCount = member.guild.memberCount
	const channelCount = member.guild.channels.cache.get("808641133655228457")
	channelCount.setName(`Membres : ${memberCount}`)
});
