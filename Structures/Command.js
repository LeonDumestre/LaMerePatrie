/*
Handler des commandes
Lien de la vidéo : https://www.youtube.com/watch?v=yIbmmBGOAO4
*/

/** @format */

const Discord = require("discord.js")
const Client = require("./Client")

/**
 * @param {Client} bot 
 * @param {Discord.Message | Discord.Interaction} message 
 * @param {string[]} args 
 */

function RunFunction(bot, message, args) {}

class Command {

    /**
     * @typedef {(name: string, description: string, permission: string, run: RunFunction)}
     * @param {CommandOptions} options 
     */

    constructor(options) {

        this.name = options.name
        this.description = options.description
        this.permission = options.permission
        this.run = options.run

    }
}

module.exports = Command