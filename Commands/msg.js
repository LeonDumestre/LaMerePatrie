import { PermissionFlagsBits } from "discord.js";

export const name = "msg";
export const description = "Le message est renvoyé par le BOT";
export const permission = PermissionFlagsBits.Administrator;
export const dm = false;
export const options = [
	{
		type: "string",
		name: "message",
		description: "Message à envoyer",
		required: true,
	},
];
export async function run(bot, message, args) {

	await message.reply({ content: "Le message a bien été envoyé !", ephemeral: true });
	await message.channel.send(args.getString("message"));
}
