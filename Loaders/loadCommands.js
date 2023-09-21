const fs = require("fs");

module.exports = async bot => {
	fs.readdirSync("./Commands").filter(f => f.endsWith(".js")).forEach(async file => {

		const command = require(`../Commands/${file}`);
		bot.commands.set(command.name, command);
		console.log(`Commande ${file.split(".js").join("")} chargée avec succès !`);
	});
};