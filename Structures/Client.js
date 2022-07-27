/*
Création de la classe Client
Lien des vidéos : https://www.youtube.com/watch?v=yIbmmBGOAO4 (commandes)
				  https://www.youtube.com/watch?v=uE5gEKd2se4 (évènements)
*/

const Discord = require('discord.js');
const fs = require('fs');
const intents = new Discord.Intents('32767');
const config = require('../Data/config.json');

class Client extends Discord.Client {

	constructor() {

		super({ intents });

		/**
		 * @type {Discord.Collection<string, Command>}
		*/

		this.commands = new Discord.Collection();

		this.prefix = config.prefix;
	}

	start(token) {

		// Chargement des commandes
		fs.readdirSync('./Commands').filter(file => file.endsWith('.js')).forEach(async file => {

			/**
			 * @type {Command}
			 */

			const command = require(`../Commands/${file}`);
			// console.log(`\x1b[31m${file}\x1b[37m commande chargée avec succès`)
			this.commands.set(command.name, command);

		});

		// Chargement des évènements
		fs.readdirSync('./Events').filter(file => file.endsWith('.js')).forEach(async file => {

			/**
			 * @type {Event}
			 */

			const event = require(`../Events/${file}`);
			// console.log(`\x1b[31m${file}\x1b[37m évènement chargé avec succès`)
			this.on(event.event, event.run.bind(null, this));

		});

		this.login(token);

	}

}

module.exports = Client;