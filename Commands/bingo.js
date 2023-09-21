import { EmbedBuilder } from "discord.js";
import { writeFileSync } from "fs";
import { getServersData, getServerDataInd } from "../Tools/global.js";

export const name = "bingo";
export const description = "Lance un bingo où tu devras trouver le nombre entre 1 et 100";
export const permission = "";
export async function run(bot, interaction) {

	const embed = new EmbedBuilder();
	const serversData = getServersData();
	const serverDataInd = getServerDataInd(interaction.guild.id);
	const bingoData = serversData.servers[serverDataInd].bingo;

	if (!bingoData.winNumber) {
		serversData.servers[serverDataInd].bingo.currentChannel = interaction.channel.id;
		serversData.servers[serverDataInd].bingo.winNumber = `${Math.floor(Math.random() * (99) + 1)}`;
		const jsonData = JSON.stringify(serversData);
		writeFileSync("./ServersData/servers.json", jsonData);

		embed.setColor(255).setTitle("🎉 LE BINGO COMMENCE !!! 🎉").setDescription("*Trouve le nombre entre 1 et 100*");
		interaction.reply({ embeds: [embed] });
	}
	else {
		interaction.reply(`Un bingo est déjà lancé dans <#${bingoData.currentChannel}>.`);
	}
}
