import { readdirSync } from "fs";

export default async bot => {
	readdirSync("./Events").filter(f => f.endsWith(".js")).forEach(async file => {

		const event = import(`../Events/${file}`);
		console.log(await event);
		bot.on(file.split(".js").join(""), event.bind(null, bot));
		console.log(`Evènement ${file.split(".js").join("")} chargé avec succès !`);
	});
};