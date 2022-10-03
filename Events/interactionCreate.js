const Discord = require("discord.js");
const { getServersData, getServerDataInd } = require("../Tools/global");

module.exports = async (bot, interaction) => {

    const serverDataInd = getServerDataInd(interaction.guild.id);
    const serverData = getServersData().servers[serverDataInd];

    if (interaction.type === Discord.InteractionType.ApplicationCommand) {
        const cmd = bot.commands.find(cmd => cmd.name === interaction.commandName);
        if (serverData.cmdChannels.length > 0 && !serverData.cmdChannels.find(channel => channel === interaction.channel.id) && !cmd.permission) {
            let listMsg = "";
            serverData.cmdChannels.forEach(channel => listMsg += `\n• <#${channel}>`);
            return interaction.reply({content: `Tu peux uniquement exécuter des commandes dans les channels : ${listMsg}`, ephemeral: true });
        }

        if ((interaction.commandName == 'goulag' && !serverData.options.goulag) || (interaction.commandName == 'bingo' && !serverData.options.bingo))
            return interaction.reply({content: 'Cette fonctionnalité n\'est pas activée sur ce serveur... \nDemande à un administrateur d\'y remédier à l\'aide des commandes \`/setup\` !', ephemeral: true });

        const command = require(`../Commands/${interaction.commandName}`);
        command.run(bot, interaction, interaction.options);

        const date = new Date();
        const options = { year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
        const dateString = date.toLocaleDateString('fr', options).replace(',', ' -');

        if (serverData.options.logs && serverData.logsChannel && interaction.guild.channels.cache.find(c => c.id === serverData.logsChannel)) {
            const embed = new Discord.EmbedBuilder();
            const channelLog = bot.channels.cache.get(serverData.logsChannel);
            embed.setTitle(command.name)
                .addFields({ name: 'Channel :', value: `<#${interaction.channel.id}>`, inline: true })
                .addFields({ name: 'Auteur :', value: `<@!${interaction.member.id}>`, inline: true })
                .setThumbnail(interaction.member.user.displayAvatarURL())
                .setFooter({ text: dateString });
            channelLog.send({ embeds: [embed] });
        }

        console.log(`\x1b[90m${dateString}\x1b[0m || \x1b[32m${interaction.guild.name} (${interaction.guild.id})\x1b[0m || \x1b[36m${interaction.user.username} (${interaction.user.id})\x1b[0m ||\x1b[31m ${interaction.channel.name} (${interaction.channel.id})\x1b[0m ||\x1b[33m ${command.name}\x1b[0m`);
    }
}