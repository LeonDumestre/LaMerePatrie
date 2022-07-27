const Command = require("./Structures/Command")
const Discord = require('discord.js')

module.exports = {
    
    name: "reactionRole",
	description: "",
	permission: "MANAGE_MESSAGES",

    async execute(bot, message, args) {
        console.log("test")

        const channel = '882675052770914305'
        const roleInvite = message.guild.roles.cache.find(role => role.name === "Invité")
        //const roleAttente = message.guild.roles.cache.find(role => role.name === "En attente")

        const emojiCheck = ':check:'

        let embed = new Discord.MessageEmbed()
            .setColor("#2c2f33")
            .setTitle("Bienvenue sur le serveur de l'IUT informatique de Bourg en Bresse !")
            .setDescription("Sur ce serveur tu pourras :\n\t- Discuter avec plein de monde,\n\t- Travailler en vocal ou à l'écrit avec d'autres personnes,\n\t- Demander de l'aide dans les différentes matières qui te posent problème,\n\t- Suivre les cours en distanciel (on espère pas...)\n\t et plein d'autres trucs.")
    
        let messageEmbed = await message.channel.send(embed)
        messageEmbed.react(emojiCheck)

        bot.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.parial) await reaction.message.fetch()
            if (reaction.partial) await reaction.fetch()
            if (user.bot) return

            if (reaction.message.channel.id == channel) {
                if (reaction.message.name === emojiCheck) {

                    await reaction.message.guild.members.cache.get(user.id).roles.add(roleInvite)
                }
            }
            else {
                return
            }
            
            
        })
    }

}