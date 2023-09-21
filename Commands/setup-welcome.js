const Discord = require("discord.js");
const { getServerDataInd, getServersData } = require("../../Tools/global");
const fs = require('fs');

module.exports = {

	name: "setup-welcome",
	description: "Choisis un salon où sera affiché les messages d'accueil",
	permission: Discord.PermissionFlagsBits.Administrator,
	dm: false,
    options: [
        {
            type: "boolean",
            name: "état",
            description: "Active / désactive",
            required: true
        },
        {
            type: "channel",
            name: "salon",
            description: "Salon de bienvenue",
            required: false
        }
    ],

	async run(bot, message, args) {

        const serverDataInd = getServerDataInd(message.guild.id);
        const serversData = getServersData();

        serversData.servers[serverDataInd].options.welcome = args.getBoolean("état");
        if (args.getChannel("salon") && args.getChannel("salon").type === 0) serversData.servers[serverDataInd].welcomeChannel = args.getChannel("salon").id;
        if ((serversData.servers[serverDataInd].welcomeChannel && !message.guild.channels.cache.find(c => c.id === serversData.servers[serverDataInd].welcomeChannel)) || !serversData.servers[serverDataInd].welcomeChannel) {
            serversData.servers[serverDataInd].welcomeChannel = "";
            serversData.servers[serverDataInd].options.welcome = false;
        }
        fs.writeFileSync(`ServersData/servers.json`, JSON.stringify(serversData));

        message.reply({ content: `Les messages d'accueil sont **${args.getBoolean("état") && serversData.servers[serverDataInd].welcomeChannel ? 'activés' : 'désactivés'}** ! \n${serversData.servers[serverDataInd].welcomeChannel === "" ? '*⚠️ Il n\'y a aucun salon TEXTUEL choisi, ce qui est indispensable pour activer la fonctionnalité*' : `Le salon choisi est <#${serversData.servers[serverDataInd].welcomeChannel}>`}.`, ephemeral: true });
    }
}