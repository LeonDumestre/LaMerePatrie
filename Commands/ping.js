export const name = "ping";
export const description = "Affiche la latence du BOT";
export const permission = "";
export const dm = true;
export async function run(bot, message) {

	const startTime = Date.now();
	await message.reply("en cours...");
	const endTime = Date.now();
	await message.editReply(`\`Latence du BOT\` : ${endTime - startTime}ms\n\`Latence de l'API Discord\` : ${bot.ws.ping}ms`);
}