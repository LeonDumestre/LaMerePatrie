/*
Création de la commande ping
Lien de la vidéo : https://www.youtube.com/watch?v=eQzNWGyAAmI
*/

const Discord = require("discord.js")
const Command = require("../Structures/Command")

module.exports = new Command({

    name: "ping",
    description: "Affiche le ping du bot et le ping de l'API Discord",
    permission: "Aucune",

    async run(bot, message, args) {

        const startTime = Date.now()

        await message.reply(`en cours...`).then(async msg => {
            
            const endTime = Date.now()

            await msg.edit(`\`Latence du BOT\` : ${endTime - startTime}ms\n\`Latence de l'API Discord\` : ${bot.ws.ping}ms`)
        })

    }

})