const Discord = require("discord.js");
const fs = require("fs");
const { getServersData, getServerDataInd } = require("../Tools/global");

module.exports = {

	name: "bingo",
	description: "Lance un bingo où tu devras trouver le nombre entre 1 et 100",
	permission: "",

	run: async (bot, interaction) => {

		const embed = new Discord.EmbedBuilder();
		const serversData = getServersData();
		const serverDataInd = getServerDataInd(interaction.guild.id);
		const bingoData = serversData.servers[serverDataInd].bingo;

		if (!bingoData.winNumber) {
			serversData.servers[serverDataInd].bingo.currentChannel = interaction.channel.id;
			serversData.servers[serverDataInd].bingo.winNumber = `${Math.floor(Math.random() * (99) + 1)}`;
			const jsonData = JSON.stringify(serversData);
			fs.writeFileSync("./ServersData/servers.json", jsonData);

			embed.setColor(0x0000FF).setTitle("🎉 LE BINGO COMMENCE !!! 🎉").setDescription("*Trouve le nombre entre 1 et 100*");
			interaction.reply({ embeds: [embed] });
		}
		else {
			interaction.reply(`Un bingo est déjà lancé dans <#${bingoData.currentChannel}>.`);
		}
	},
};
