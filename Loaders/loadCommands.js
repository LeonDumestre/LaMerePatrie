import { readdirSync } from "fs";

export default async bot => {
	readdirSync("./Commands").filter(f => f.endsWith(".js")).forEach(async file => {

		const command = import(`../Commands/${file}`);
		bot.commands.set(command.name, command);
		console.log(`Commande ${file.split(".js").join("")} chargée avec succès !`);
	});
};