const Discord = require("discord.js");
const fs = require("fs");
const { getServerStats, getMemberStatsInd, getServersData, getServerDataInd } = require("../Tools/global");

module.exports = async (bot, member) => {

	const serverDataInd = getServerDataInd(member.guild.id);
	const serverData = getServersData().servers[serverDataInd];
	console.log();
	if (serverData.options.welcome) {

		const channel = member.guild.channels.cache.get(serverData.welcomeChannel);
		if (channel) {
			const fileData = fs.readFileSync("./data.json");
			const msgData = JSON.parse(fileData);

			let name = member.user.tag;
			name = name.substring(0, name.indexOf("#"));

			const nbr = Math.floor(Math.random() * msgData.memberAdd.length);
			let msg = msgData.memberAdd[nbr];
			msg = msg.replace("$name$", `${name}`);

			const embed = new Discord.EmbedBuilder();
			embed
				.setTitle(msg)
				.setColor(0x389738)
				.setThumbnail(member.user.displayAvatarURL())
				.setDescription(`${member} Bienvenue sur le serveur Discord de l'IUT informatique de Bourg en Bresse !`)
				.setTimestamp(member.joinedTimestamp);
			channel.send({ embeds: [embed] });

			const date = new Date();
			const options = { year: "2-digit", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" };
			const dateString = date.toLocaleDateString("fr", options).replace(",", " -");

			console.log(`\x1b[90m${dateString}\x1b[0m || \x1b[32m${member.guild.name} (${member.guild.id})\x1b[0m ||\x1b[36m ${member.user.tag} (${member.id}) a rejoint le serveur !\x1b[0m`);

			const memberStatsInd = getMemberStatsInd(member.guild.id, member);
			const stats = getServerStats(member.guild.id);
			stats.members[memberStatsInd].dateQuit = 0;
			fs.writeFileSync(`./ServersData/Stats/${member.guild.id}.json`, JSON.stringify(stats));
		}
	}

	if (serverData.options.newMemberRole) {
		if (serverData.options.newMemberRole) {
			const role = member.guild.roles.cache.get(serverData.newMemberRole);
			if (role) member.roles.add(role);
		}
	}

	if (serverData.options.counter) {
		const channel = member.guild.channels.cache.get(serverData.counterChannel);
		if (channel) {
			const memberCount = member.guild.memberCount;
			channel.setName(`Membres : ${memberCount}`);
		}
	}
};
