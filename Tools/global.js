const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
    getServersData: function() {
        const file = fs.readFileSync("./ServersData/servers.json");
        return JSON.parse(file);
    },

    getServerStats: function(guildId) {
	// create file if not exist
        let statsExist = false;
        fs.readdirSync("./ServersData/Stats").filter(f => f.endsWith(".json")).forEach(async file => {
            if (file.split(".json").join("") == guildId) statsExist = true;
        });

        if (!statsExist) fs.writeFileSync(`ServersData/Stats/${guildId}.json`, JSON.stringify({"members":[]}));
	const file = fs.readFileSync(`./ServersData/Stats/${guildId}.json`);
	return JSON.parse(file);
    },

    getServerDataInd : function(guildId) {
        const link = './ServersData/servers.json';
        const file = fs.readFileSync(link);
        const serversData = JSON.parse(file);
        
        let serverDataInd = -1, ind = 0;
        serversData.servers.forEach(async function(server, index) {
            if (server.id === guildId) serverDataInd = index;
        });
        
        if (serverDataInd === -1) {
            serverDataInd = serversData.servers.length;
            const newServer = {
                "id": guildId,
                "initDate": Date.now(),
                "options": {
                    "welcome": false,
                    "newMemberRole": false,
                    "counter": false,
                    "goulag": false,
                    "bingo": false,
                    "logs": false
                },
                "welcomeChannel": "",
                "newMemberRole": "",
                "counterChannel": "",
                "cmdChannels": [],
                "goulagRole": "",
                "bingo": {
                    "currentChannel": "",
                    "winNumber": ""
                },
                "logsChannel": ""
            };
            serversData.servers.push(newServer);
            fs.writeFileSync(link, JSON.stringify(serversData));
        }

        let statsExist = false;
        fs.readdirSync("./ServersData/Stats").filter(f => f.endsWith(".json")).forEach(async file => {
            if (file.split(".json").join("") == guildId) statsExist = true;
        });

        if (!statsExist) fs.writeFileSync(link, JSON.stringify(serversData));
        return serverDataInd;
    },

    getMemberStatsInd: function(guildId, member) {
        let statsExist = false;
        fs.readdirSync("./ServersData/Stats").filter(f => f.endsWith(".json")).forEach(async file => {
            if (file.split(".json").join("") == guildId) statsExist = true;
        });
        if (!statsExist) fs.writeFileSync(`ServersData/Stats/${guildId}.json`, JSON.stringify({"members":[]}));

        const link = `./ServersData/Stats/${guildId}.json`;
        const file = fs.readFileSync(link);
        serverStats = JSON.parse(file);
        
        let memberStatsInd = -1;
        serverStats.members.forEach(async function(memberStats, index) {
            if (memberStats.id === member.id) memberStatsInd = index;
        });

        if (memberStatsInd === -1) {
            const date = new Date();
            const options = { year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
            const dateString = date.toLocaleDateString('fr', options).replace(',', ' -');

            const newMember = {
                'id': member.id, 
                'winBingo': 0, 
                'goulag': { 
                    'nbrFoisAllé': 0, 
                    'nbrFoisEnvoyé': 0, 
                    'tpsPassé': 0, 
                    'nbrEvent': { 
                        'auteurEnvoyé': 0, 
                        'tpsDoublé': 0, 
                        'tpsDivisé': 0 
                    }, 
                    'ennemis': [], 
                    'cibles': [] 
                }, 
                'dateQuit': 0
            };

            memberStatsInd = serverStats.members.length;
            serverStats.members.push(newMember);
            fs.writeFileSync(link, JSON.stringify(serverStats));
            console.log(`\x1b[90m${dateString}\x1b[0m ||\x1b[36m ${member.user.tag} (${member.id}) a été ajouté à la base de données.\x1b[0m`);
        }
        return memberStatsInd;
    }
};