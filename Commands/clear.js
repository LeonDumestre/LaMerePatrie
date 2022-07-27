/*
Création de la commande Clear
Lien de la vidéo : https://www.youtube.com/watch?v=wwybJxR1fMw
*/

/** @format */

const Command = require("../Structures/Command")
const Discord = require("discord.js")

module.exports = new Command({

	name: "clear",
	description: "Efface un certains nombre de message",
	permission: "ADMINISTRATOR",

	async run(bot, message, args) {
		
        if (!message.member.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)) return message.reply("Tu n'as pas la permission d'utiliser cette commande !")
        
        const amount = args[1]

        if (!amount)
            return message.reply("Il faut rentrer le nombre de messages à effacer !")

        if (isNaN(amount) || amount == 0)
            return message.reply(`${amount} n'est pas un nombre valide !`)

        const amountParsed = parseInt(amount)

        if (amountParsed > 50)
            return message.reply("Tu ne peux pas effacer plus de 50 messages !")

        message.channel.bulkDelete(amountParsed+1)
            .catch(error => { return message.reply("Ces messages ne peuvent pas être effacés !") })

        let msg 
        if (amountParsed > 1)
            msg = await message.channel.send(`${amountParsed} messages effacés !`)
        else
            msg = await message.channel.send(`${amountParsed} message effacé !`)

        setTimeout(() => msg.delete(), 2000)
        
	}
});