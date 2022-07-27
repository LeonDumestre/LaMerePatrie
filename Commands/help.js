
const Discord = require("discord.js")
const Command = require("../Structures/Command")

module.exports = new Command({

    name: "help",
    description: "Explique les commandes",
    permission: "Aucune",

    async run(bot, message, args) {


        await message.reply(`Commande help`)

    }

})