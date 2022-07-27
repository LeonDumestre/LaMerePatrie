const Command = require('../Structures/Command');

module.exports = new Command({

	name: 'msg',
	description: 'Supprime le msg envoyé et renvoie le même',
	permission: '',

	async run(bot, message) {
		// const member = message.author

		if (!message.member.roles.cache.get('757922602319609927') && !message.member.roles.cache.get('757923147121950813')) return message.reply('Tu n\'as pas la permission d\'utiliser cette commande !');
		// if (!(member.id == '359376874524114944')) return message.reply("Tu n'as pas la permission d'utiliser cette commande !")


		// const id = message.id;
		// let Attachment = (message.attachments).array()
		// let image = falses
		message.channel.bulkDelete(Number(1));
		/* Attachment.forEach(function(attachment) {
			image = true
			if (args[0] === 'ping'){
				return message.channel.send(`||<@&${args[1]}>\n||`+message.content.substring(28),attachment)
			}
			else{
				return message.channel.send(message.content.substring(5),attachment)
			}
		}) */

		// if(image == false){
		// if (args[0] === 'ping') {
		// return await message.channel.send(`||<@&${args[1]}>\n||`+message.content.substring(28))
		// }
		// else {
		return await message.channel.send(message.content.substring(5));
		// }
		// }
		// }
		// else { message.channel.send(new Discord.MessageEmbed()
		//    .setDescription(`${message.member}, tu n'as pas la permission d'utiliser cette commande !!`)
		//    .setColor('#FF0000'))
		// }
	},

});