import { PermissionFlagsBits } from "discord.js";

export const name = "clear";
export const description = "Supprime un nombre de messages défini";
export const permission = PermissionFlagsBits.ManageChannels;
export const dm = false;
export const options = [
	{
		type: "number",
		name: "nombre",
		description: "Nombre de messages à supprimer",
		required: true,
	},
];
export async function run(bot, message, args) {

	const number = args.getNumber("nombre");
	if (number <= 0) return message.reply({ content: "Le nombre doit être supérieur à 0 !", ephemeral: true });
	if (number > 50) return message.reply({ content: "Tu ne peux pas effacer plus de 50 messages !", ephemeral: true });

	await message.channel.bulkDelete(number)
		.then(() => {
			if (number > 1) message.reply({ content: `${number} messages effacés !`, ephemeral: true });
			else message.reply({ content: `${number} message effacé !`, ephemeral: true });
		})
		.catch(() => { return message.reply({ content: "Ces messages ne peuvent pas être effacés !", ephemeral: true }); });
}