const fs = require('fs');

module.exports = async bot => {
    fs.readdirSync("./Events").filter(f => f.endsWith(".js")).forEach(async file => {

        const event = require(`../Events/${file}`);
        bot.on(file.split(".js").join(""), event.bind(null, bot));
        console.log(`Evènement ${file.split(".js").join("")} chargé avec succès !`);
    });
}