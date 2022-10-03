const Discord = require("discord.js");
const { getServerDataInd, getServersData } = require("../Tools/global");
const fs = require('fs');

module.exports = {

	name: "setup-bingo",
	description: "Active / désactive le bingo",
	permission: Discord.PermissionFlagsBits.Administrator,
	dm: false,
    options: [
        {
            type: "boolean",
            name: "état",
            description: "Active / désactive",
            required: true
        }
    ],

	async run(bot, message, args) {

        const serverDataInd = getServerDataInd(message.guild.id);
        const serversData = getServersData();

        serversData.servers[serverDataInd].options.bingo = args.getBoolean("état");
        fs.writeFileSync(`ServersData/servers.json`, JSON.stringify(serversData));

        message.reply({ content: `Le bingo est **${args.getBoolean("état") ? 'activé' : 'désactivé'}** ! \n*⚠️ Il est conseillé de choisir les channels où les commandes peuvent être utilisées avec la commande \`/setup-channels\`.*`, ephemeral: true });
    }
}