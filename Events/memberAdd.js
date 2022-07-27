/*
Envoie un message lorsqu'une personne rejoint le serveur.
Lien de la vidéo : https://www.youtube.com/watch?v=iJ5QOE8m1i4
*/

/** @format */

const Event = require("../Structures/Event.js");
const Discord = require("discord.js");
const fs = require('fs')

module.exports = new Event("guildMemberAdd", (client, member) => {
	
	const channel = member.guild.channels.cache.get('758416588834603009') //Accueil
	//const channel = member.guild.channels.cache.get('758419452462104617') //Test-bot

	if (!channel) return

	let linkData = './Data/data.json'
    let fileData =  fs.readFileSync(linkData)
    let data = JSON.parse(fileData)

	let nom = member.user.tag
	nom = nom.substring(0, nom.indexOf('#'))

	const nbr = Math.floor(Math.random() * data.memberAdd.length)
	let msg = data.memberAdd[nbr]
	msg = msg.replace('$name$', `${nom}`)

	const embed = new Discord.MessageEmbed()

	embed
		.setTitle(msg)
		.setColor("GREEN")
		.setThumbnail(member.user.avatarURL({ dynamic: true }))
		.setDescription(`${member} Bienvenue sur le serveur Discord de l'IUT informatique de Bourg en Bresse !`)
		/*.addFields(
			{
				name: "Compte créé le",
				value: member.user.createdAt.toUTCString(),
				inline: true
			},
			{
				name: "Rejoint le",
				value: member.joinedAt.toUTCString(),
				inline: true
			}
		)*/
		.setTimestamp(member.joinedTimestamp)

	channel.send({ embeds: [embed] })

    const role = member.guild.roles.cache.get("758290554978566154")
    member.roles.add(role)

	let ladate = new Date()
	console.log(`\x1b[90m${ladate.getDate()}/${ladate.getMonth() + 1} - ${ladate.getHours()}:${ladate.getMinutes()}\x1b[0m ||\x1b[32m ${member.user.tag} (${member.id}) a rejoint le serveur !\x1b[0m`)

	let linkStats = './Data/stats.json'
    let fileStats =  fs.readFileSync(linkStats)
    let stats = JSON.parse(fileStats)

	for (let i = 0; i < stats.membres.length; i++) {
		if (member.id == stats.membres[i].id) {
			stats.membres[i].dateQuit = 0
			fs.writeFileSync(linkStats, JSON.stringify(stats))
		}
	}


	let memberCount = member.guild.memberCount
	const channelCount = member.guild.channels.cache.get("808641133655228457")
	channelCount.setName(`Membres : ${memberCount}`)
});
