/*
Envoie d'un message sur le serveur et des logs
Lien de la vidéo : https://www.youtube.com/watch?v=uE5gEKd2se4
*/


/** @format */

const Event = require('../Structures/Event.js');
const Discord = require('discord.js');

module.exports = new Event('messageCreate', async (bot, message) => {

	if (message.author.bot) return;
	if (!message.content.startsWith(bot.prefix)) return;

	const args = message.content.substring(bot.prefix.length).split(/ +/);

	const command = bot.commands.find(cmd => cmd.name == args[0]);

	if (!command) return;
	/* message.reply(`${args[0]} n'existe pas !`) */

	const idCatCitation = '892330675422789722';
	const idCat2A = '882670135234678865';
	const idCatMatiere2A = '789256851023855637';
	const idCat1A = '882669976140546058';
	const idCatMatiere1A = '882637919163154442';
	const idCatDelegue = '789213580058427442';
	const idAdmin = '757922602319609927';
	if (message.channel.parent == null || (message.channel.parent.id == idCatCitation || message.channel.parent.id == idCat2A || message.channel.parent.id == idCatMatiere2A || message.channel.parent.id == idCat1A || message.channel.parent.id == idCatMatiere1A || message.channel.parent.id == idCatDelegue) && !message.member.roles.cache.get(idAdmin)) {
		const reponseBOT = await message.reply('Tu ne peux pas faire de commande ici, vas dans un endoit plus approprié');
		await message.delete();
		setTimeout(() => reponseBOT.delete(), 4000);
		return;
	}

	command.run(bot, message, args);

	const date = new Date();
	const options = { year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
	const dateString = date.toLocaleDateString('fr', options).replace(',', ' -');

	const text = message.content;
	console.log(`\x1b[90m${dateString}\x1b[0m ||\x1b[36m ${message.author.username} (${message.member.id})\x1b[0m ||\x1b[35m ${message.channel.name}\x1b[0m ||\x1b[31m ${command.name}\x1b[0m || '\x1b[3m\x1b[33m${text}\x1b[0m'`);

	const embed = new Discord.MessageEmbed();
	const channelLog = bot.channels.cache.get('895594255932882944');
	embed.setTitle(`${command.name}`)
		.setDescription(`'*${text}*'`)
		.addField('Channel :', `<#${message.channel.id}>`, true)
		.addField('Auteur :', `<@!${message.member.id}>`, true)
		.setThumbnail(message.member.user.displayAvatarURL())
		.setFooter(dateString);
	channelLog.send({ embeds: [embed] });
});
