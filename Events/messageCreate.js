const Discord = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const fs = require('fs');
const { getServerDataInd, getServersData, getServerStats, getMemberStatsInd } = require("../Tools/global");

let time, delay;

module.exports = async (bot, message) => {

    // Bingo
    if (!isNaN(message.content)) {
        const embed = new EmbedBuilder();
        const serverDataInd = getServerDataInd(message.guild.id);
        let serversData = getServersData();
		let bingoData = serversData.servers[serverDataInd].bingo;
    
        if (bingoData.winNumber && message.channel.id === bingoData.currentChannel) {
            const member = message.member;
    
            // Cooldown bingo
            const interval = setInterval(function() {

                let serversData = getServersData();
                let bingoData = serversData.servers[serverDataInd].bingo;

                if (bingoData.winNumber !== 0) {
                    if (!time) {
                        delay = Date.now() + 300000;
                        time = true;
                    }
                    if (Date.now() >= delay) {
                        embed.setColor(0x000000).setTitle('\u26A0\uFE0F Le temps est écoulé, le 🎉 Bingo 🎉 est fini !').setDescription(`*Le nombre gagnant était : ${bingoData.winNumber}*`);
                        bot.channels.cache.get(bingoData.currentChannel).send({ embeds: [embed] });
                        resetBingoData(serverDataInd);
                        time = false;
                        clearInterval(interval);
                    }
                }
            }, 1000);

            if (message.content == bingoData.winNumber) {
                embed.setColor(0x389738).setDescription(`🎉 **BRAVO** ${member} 🎉 Tu as **gagné** !!! 🎊 \n *Le nombre gagnant était : ${bingoData.winNumber}`);
                bot.channels.cache.get(bingoData.currentChannel).send({ embeds: [embed] });
                resetBingoData(serversData, serverDataInd);
                time = false;
    
    
                // Crée un membre et compléte winBingo
                const memberStatsInd = getMemberStatsInd(message.guild.id, member);
                const stats = getServerStats(message.guild.id);
                stats.members[memberStatsInd].winBingo++;
                fs.writeFileSync(`./ServersData/Stats/${message.guild.id}.json`, JSON.stringify(stats));
            }
        }
    }
}

function resetBingoData(serversData, serverDataInd) {
    try {
        serversData.servers[serverDataInd].bingo.currentChannel = "";
        serversData.servers[serverDataInd].bingo.winNumber = 0;
        const data = JSON.stringify(serversData);
        fs.writeFileSync(`./ServersData/servers.json`, data);
    } catch (error) {
        console.log(error);
    }
}