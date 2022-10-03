const loadSlashCommands = require("../Loaders/loadSlashCommands");

module.exports = async (bot) => {
    
    await loadSlashCommands(bot);
    console.log(`\x1b[40m\x1b[33m${bot.user.tag} est arrivé !\x1b[0m`);
}